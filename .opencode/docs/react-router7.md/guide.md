---
title: Routing
order: 2
---

# Routing

[MODES: framework]

## Configuring Routes

Routes are configured in `app/routes.ts`. Each route has two required parts: a URL pattern to match the URL, and a file path to the route module that defines its behavior.

```ts filename=app/routes.ts
import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("some/path", "./some/file.tsx"),
  // pattern ^           ^ module file
] satisfies RouteConfig;
```

Here is a larger sample route config:

```ts filename=app/routes.ts
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route(":city", "./concerts/city.tsx"),
    route("trending", "./concerts/trending.tsx"),
  ]),
] satisfies RouteConfig;
```

If you prefer to define your routes via file naming conventions rather than configuration, the `@react-router/fs-routes` package provides a [file system routing convention][file-route-conventions]. You can even combine different routing conventions if you like:

```ts filename=app/routes.ts
import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
  route("/", "./home.tsx"),

  ...(await flatRoutes()),
] satisfies RouteConfig;
```

## Route Modules

The files referenced in `routes.ts` define each route's behavior:

```tsx filename=app/routes.ts
route("teams/:teamId", "./team.tsx"),
//           route module ^^^^^^^^
```

Here's a sample route module:

```tsx filename=app/team.tsx
// provides type safety/inference
import type { Route } from "./+types/team";

// provides `loaderData` to the component
export async function loader({ params }: Route.LoaderArgs) {
  let team = await fetchTeam(params.teamId);
  return { name: team.name };
}

// renders after the loader is done
export default function Component({
  loaderData,
}: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

Route modules have more features like actions, headers, and error boundaries, but they will be covered in the next guide: [Route Modules](./route-module)

## Nested Routes

Routes can be nested inside parent routes.

```ts filename=app/routes.ts
import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  // parent route
  route("dashboard", "./dashboard.tsx", [
    // child routes
    index("./home.tsx"),
    route("settings", "./settings.tsx"),
  ]),
] satisfies RouteConfig;
```

The path of the parent is automatically included in the child, so this config creates both `"/dashboard"` and `"/dashboard/settings"` URLs.

Child routes are rendered through the `<Outlet/>` in the parent route.

```tsx filename=app/dashboard.tsx
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* will either be home.tsx or settings.tsx */}
      <Outlet />
    </div>
  );
}
```

## Root Route

Every route in `routes.ts` is nested inside the special `app/root.tsx` module.

## Layout Routes

Using `layout`, layout routes create new nesting for their children, but they don't add any segments to the URL. It's like the root route but they can be added at any level.

```tsx filename=app/routes.ts lines=[10,16]
import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./marketing/layout.tsx", [
    index("./marketing/home.tsx"),
    route("contact", "./marketing/contact.tsx"),
  ]),
  ...prefix("projects", [
    index("./projects/home.tsx"),
    layout("./projects/project-layout.tsx", [
      route(":pid", "./projects/project.tsx"),
      route(":pid/edit", "./projects/edit-project.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
```

Note that:

- `home.tsx` and `contact.tsx` will be rendered into the `marketing/layout.tsx` outlet without creating any new URL paths
- `project.tsx` and `edit-project.tsx` will be rendered into the `projects/project-layout.tsx` outlet at `/projects/:pid` and `/projects/:pid/edit` while `projects/home.tsx` will not.

## Index Routes

```ts
index(componentFile),
```

Index routes render into their parent's [Outlet][outlet] at their parent's URL (like a default child route).

```ts filename=app/routes.ts
import {
  type RouteConfig,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  // renders into the root.tsx Outlet at /
  index("./home.tsx"),
  route("dashboard", "./dashboard.tsx", [
    // renders into the dashboard.tsx Outlet at /dashboard
    index("./dashboard-home.tsx"),
    route("settings", "./dashboard-settings.tsx"),
  ]),
] satisfies RouteConfig;
```

Note that index routes can't have children.

## Route Prefixes

Using `prefix`, you can add a path prefix to a set of routes without needing to introduce a parent route.

```tsx filename=app/routes.ts lines=[14]
import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./marketing/layout.tsx", [
    index("./marketing/home.tsx"),
    route("contact", "./marketing/contact.tsx"),
  ]),
  ...prefix("projects", [
    index("./projects/home.tsx"),
    layout("./projects/project-layout.tsx", [
      route(":pid", "./projects/project.tsx"),
      route(":pid/edit", "./projects/edit-project.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
```

Note that this does not introduce a new route into the route tree. Instead, it merely modifies the paths of its children.

For example, these two sets of routes are equivalent:

```ts filename=app/routes.ts
// This usage of `prefix`...
prefix("parent", [
  route("child1", "./child1.tsx"),
  route("child2", "./child2.tsx"),
])

// ...is equivalent to this:
[
  route("parent/child1", "./child1.tsx"),
  route("parent/child2", "./child2.tsx"),
]
```

## Dynamic Segments

If a path segment starts with `:` then it becomes a "dynamic segment". When the route matches the URL, the dynamic segment will be parsed from the URL and provided as `params` to other router APIs.

```ts filename=app/routes.ts
route("teams/:teamId", "./team.tsx"),
```

```tsx filename=app/team.tsx
import type { Route } from "./+types/team";

export async function loader({ params }: Route.LoaderArgs) {
  //                           ^? { teamId: string }
}

export default function Component({
  params,
}: Route.ComponentProps) {
  params.teamId;
  //        ^ string
}
```

You can have multiple dynamic segments in one route path:

```ts filename=app/routes.ts
route("c/:categoryId/p/:productId", "./product.tsx"),
```

```tsx filename=app/product.tsx
import type { Route } from "./+types/product";

async function loader({ params }: LoaderArgs) {
  //                    ^? { categoryId: string; productId: string }
}
```

## Optional Segments

You can make a route segment optional by adding a `?` to the end of the segment.

```ts filename=app/routes.ts
route(":lang?/categories", "./categories.tsx"),
```

You can have optional static segments, too:

```ts filename=app/routes.ts
route("users/:userId/edit?", "./user.tsx");
```

## Splats

Also known as "catchall" and "star" segments. If a route path pattern ends with `/*` then it will match any characters following the `/`, including other `/` characters.

```ts filename=app/routes.ts
route("files/*", "./files.tsx"),
```

```tsx filename=app/files.tsx
export async function loader({ params }: Route.LoaderArgs) {
  // params["*"] will contain the remaining URL after files/
}
```

You can destructure the `*`, you just have to assign it a new name. A common name is `splat`:

```tsx
const { "*": splat } = params;
```

You can also use a splat to catch requests that don't match any route:

```ts filename=app/routes.ts
route("*", "./catchall.tsx"); // catchall route,
```

```tsx filename=app/catchall.tsx
export function loader() {
  throw new Response("Page not found", { status: 404 });
}
```

## Component Routes

You can also use components that match the URL to elements anywhere in the component tree:

```tsx
import { Routes, Route } from "react-router";

function Wizard() {
  return (
    <div>
      <h1>Some Wizard with Steps</h1>
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />} />
      </Routes>
    </div>
  );
}
```

Note that these routes do not participate in data loading, actions, code splitting, or any other route module features, so their use cases are more limited than those of the route module.

---

Next: [Route Module](./route-module)

[file-route-conventions]: ../../how-to/file-route-conventions
[outlet]: https://api.reactrouter.com/v7/functions/react-router.Outlet.html


---
{
  "mcp": {
    "jira": {
      "type": "remote",
      "url": "https://jira.example.com/mcp",
      "enabled": true
    }
  }
}


----
---
title: Rendering Strategies
order: 4
---

# Rendering Strategies

[MODES: framework]

## Introduction

There are three rendering strategies in React Router:

- Client Side Rendering
- Server Side Rendering
- Static Pre-rendering

## Client Side Rendering

Routes are always client side rendered as the user navigates around the app. If you're looking to build a Single Page App, disable server rendering:

```ts filename=react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
} satisfies Config;
```

## Server Side Rendering

```ts filename=react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
} satisfies Config;
```

Server side rendering requires a deployment that supports it. Though it's a global setting, individual routes can still be statically pre-rendered. Routes can also use client data loading with `clientLoader` to avoid server rendering/fetching for their portion of the UI.

## Static Pre-rendering

```ts filename=react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  // return a list of URLs to prerender at build time
  async prerender() {
    return ["/", "/about", "/contact"];
  },
} satisfies Config;
```

Pre-rendering is a build-time operation that generates static HTML and client navigation data payloads for a list of URLs. This is useful for SEO and performance, especially for deployments without server rendering. When pre-rendering, route module loaders are used to fetch data at build time.

---

Next: [Data Loading](./data-loading)

---
---
title: Data Loading
order: 5
---

# Data Loading

[MODES: framework]

## Introduction

Data is provided to the route component from `loader` and `clientLoader`.

Loader data is automatically serialized from loaders and deserialized in components. In addition to primitive values like strings and numbers, loaders can return promises, maps, sets, dates and more.

The type for the `loaderData` prop is [automatically generated][type-safety].

<docs-info>We try to support the same set of [serializable types][serializable-types] that React permits server components to pass as props to client components. This future proofs your application for any eventual migration to [RSC][rsc].</docs-info>

## Client Data Loading

`clientLoader` is used to fetch data on the client. This is useful for pages or full projects that you'd prefer to fetch data from the browser only.

```tsx filename=app/product.tsx
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  const product = await res.json();
  return product;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

## Server Data Loading

When server rendering, `loader` is used for both initial page loads and client navigations. Client navigations call the loader through an automatic `fetch` by React Router from the browser to your server.

```tsx filename=app/product.tsx
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";
import { fakeDb } from "../db";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fakeDb.getProduct(params.pid);
  return product;
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

Note that the `loader` function is removed from client bundles so you can use server only APIs without worrying about them being included in the browser.

## Static Data Loading

When pre-rendering, loaders are used to fetch data during the production build.

```tsx filename=app/product.tsx
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  let product = await getProductFromCSVFile(params.pid);
  return product;
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

The URLs to pre-render are specified in `react-router.config.ts`:

```ts filename=react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  async prerender() {
    let products = await readProductsFromCSVFile();
    return products.map(
      (product) => `/products/${product.id}`,
    );
  },
} satisfies Config;
```

Note that when server rendering, any URLs that aren't pre-rendered will be server rendered as usual, allowing you to pre-render some data at a single route while still server rendering the rest.

## Using Both Loaders

`loader` and `clientLoader` can be used together. The `loader` will be used on the server for initial SSR (or pre-rendering) and the `clientLoader` will be used on subsequent client-side navigations.

```tsx filename=app/product.tsx
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";
import { fakeDb } from "../db";

export async function loader({ params }: Route.LoaderArgs) {
  return fakeDb.getProduct(params.pid);
}

export async function clientLoader({
  serverLoader,
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  const serverData = await serverLoader();
  return { ...serverData, ...res.json() };
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

You can also force the client loader to run during hydration and before the page renders by setting the `hydrate` property on the function. In this situation you will want to render a `HydrateFallback` component to show a fallback UI while the client loader runs.

```tsx filename=app/product.tsx
export async function loader() {
  /* ... */
}

export async function clientLoader() {
  /* ... */
}

// force the client loader to run during hydration
clientLoader.hydrate = true as const; // `as const` for type inference

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product() {
  /* ... */
}
```

---

Next: [Actions][actions]

See also:

- [Streaming with Suspense][streaming]
- [Client Data][client-data]
- [Using Fetchers][fetchers]

[type-safety]: ../../explanation/type-safety
[serializable-types]: https://react.dev/reference/rsc/use-client#serializable-types
[rsc]: ../../how-to/react-server-components
[actions]: ./actions
[streaming]: ../../how-to/suspense
[client-data]: ../../how-to/client-data
[fetchers]: ../../how-to/fetchers#loading-data

---
---
title: Actions
order: 6
---

# Actions

[MODES: framework]

## Introduction

Data mutations are done through Route actions. When the action completes, all loader data on the page is revalidated to keep your UI in sync with the data without writing any code to do it.

Route actions defined with `action` are only called on the server while actions defined with `clientAction` are run in the browser.

## Client Actions

Client actions only run in the browser and take priority over a server action when both are defined.

```tsx filename=app/project.tsx
// route('/projects/:projectId', './project.tsx')
import type { Route } from "./+types/project";
import { Form } from "react-router";
import { someApi } from "./api";

export async function clientAction({
  request,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  let title = formData.get("title");
  let project = await someApi.updateProject({ title });
  return project;
}

export default function Project({
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Project</h1>
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Submit</button>
      </Form>
      {actionData ? (
        <p>{actionData.title} updated</p>
      ) : null}
    </div>
  );
}
```

## Server Actions

Server actions only run on the server and are removed from client bundles.

```tsx filename=app/project.tsx
// route('/projects/:projectId', './project.tsx')
import type { Route } from "./+types/project";
import { Form } from "react-router";
import { fakeDb } from "../db";

export async function action({
  request,
}: Route.ActionArgs) {
  let formData = await request.formData();
  let title = formData.get("title");
  let project = await fakeDb.updateProject({ title });
  return project;
}

export default function Project({
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Project</h1>
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Submit</button>
      </Form>
      {actionData ? (
        <p>{actionData.title} updated</p>
      ) : null}
    </div>
  );
}
```

## Calling Actions

Actions are called declaratively through `<Form>` and imperatively through `useSubmit` (or `<fetcher.Form>` and `fetcher.submit`) by referencing the route's path and a "post" method.

### Calling actions with a Form

```tsx
import { Form } from "react-router";

function SomeComponent() {
  return (
    <Form action="/projects/123" method="post">
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

This will cause a navigation and a new entry will be added to the browser history.

### Calling actions with useSubmit

You can submit form data to an action imperatively with `useSubmit`.

```tsx
import { useCallback } from "react";
import { useSubmit } from "react-router";
import { useFakeTimer } from "fake-lib";

function useQuizTimer() {
  let submit = useSubmit();

  let cb = useCallback(() => {
    submit(
      { quizTimedOut: true },
      { action: "/end-quiz", method: "post" },
    );
  }, []);

  let tenMinutes = 10 * 60 * 1000;
  useFakeTimer(tenMinutes, cb);
}
```

This will cause a navigation and a new entry will be added to the browser history.

### Calling actions with a fetcher

Fetchers allow you to submit data to actions (and loaders) without causing a navigation (no new entries in the browser history).

```tsx
import { useFetcher } from "react-router";

function Task() {
  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  return (
    <fetcher.Form method="post" action="/update-task/123">
      <input type="text" name="title" />
      <button type="submit">
        {busy ? "Saving..." : "Save"}
      </button>
    </fetcher.Form>
  );
}
```

They also have the imperative `submit` method.

```tsx
fetcher.submit(
  { title: "New Title" },
  { action: "/update-task/123", method: "post" },
);
```

See the [Using Fetchers][fetchers] guide for more information.

---

Next: [Navigating](./navigating)

[fetchers]: ../../how-to/fetchers
[data]: ../../api/react-router/data

---
---
title: Navigating
order: 6
---

# Navigating

[MODES: framework]

## Introduction

Users navigate your application with `<Link>`, `<NavLink>`, `<Form>`, `redirect`, and `useNavigate`.

## NavLink

This component is for navigation links that need to render active and pending states.

```tsx
import { NavLink } from "react-router";

export function MyAppNav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/trending" end>
        Trending Concerts
      </NavLink>
      <NavLink to="/concerts">All Concerts</NavLink>
      <NavLink to="/account">Account</NavLink>
    </nav>
  );
}
```

`NavLink` renders default class names for different states for easy styling with CSS:

```css
a.active {
  color: red;
}

a.pending {
  animate: pulse 1s infinite;
}

a.transitioning {
  /* css transition is running */
}
```

It also has callback props on `className`, `style`, and `children` with the states for inline styling or conditional rendering:

```tsx
// className
<NavLink
  to="/messages"
  className={({ isActive, isPending, isTransitioning }) =>
    [
      isPending ? "pending" : "",
      isActive ? "active" : "",
      isTransitioning ? "transitioning" : "",
    ].join(" ")
  }
>
  Messages
</NavLink>
```

```tsx
// style
<NavLink
  to="/messages"
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  }}
>
  Messages
</NavLink>
```

```tsx
// children
<NavLink to="/tasks">
  {({ isActive, isPending, isTransitioning }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

## Link

Use `<Link>` when the link doesn't need active styling:

```tsx
import { Link } from "react-router";

export function LoggedOutMessage() {
  return (
    <p>
      You've been logged out.{" "}
      <Link to="/login">Login again</Link>
    </p>
  );
}
```

## Form

The form component can be used to navigate with `URLSearchParams` provided by the user.

```tsx
<Form action="/search">
  <input type="text" name="q" />
</Form>
```

If the user enters "journey" into the input and submits it, they will navigate to:

```
/search?q=journey
```

Forms with `<Form method="post" />` will also navigate to the action prop but will submit the data as `FormData` instead of `URLSearchParams`. However, it is more common to `useFetcher()` to POST form data. See [Using Fetchers](../../how-to/fetchers).

## redirect

Inside of route loaders and actions, you can return a `redirect` to another URL.

```tsx
import { redirect } from "react-router";

export async function loader({ request }) {
  let user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }
  return { userName: user.name };
}
```

It is common to redirect to a new record after it has been created:

```tsx
import { redirect } from "react-router";

export async function action({ request }) {
  let formData = await request.formData();
  let project = await createProject(formData);
  return redirect(`/projects/${project.id}`);
}
```

## useNavigate

This hook allows the programmer to navigate the user to a new page without the user interacting. Usage of this hook should be uncommon. It's recommended to use the other APIs in this guide when possible.

Reserve usage of `useNavigate` to situations where the user is _not_ interacting but you need to navigate, for example:

- Logging them out after inactivity
- Timed UIs like quizzes, etc.

```tsx
import { useNavigate } from "react-router";

export function useLogoutAfterInactivity() {
  let navigate = useNavigate();

  useFakeInactivityHook(() => {
    navigate("/logout");
  });
}
```

---

Next: [Pending UI](./pending-ui)

---
---
title: Pending UI
order: 7
---

# Pending UI

[MODES: framework]

## Introduction

When the user navigates to a new route, or submits data to an action, the UI should immediately respond to the user's actions with a pending or optimistic state. Application code is responsible for this.

## Global Pending Navigation

When the user navigates to a new url, the loaders for the next page are awaited before the next page renders. You can get the pending state from `useNavigation`.

```tsx
import { useNavigation } from "react-router";

export default function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <html>
      <body>
        {isNavigating && <GlobalSpinner />}
        <Outlet />
      </body>
    </html>
  );
}
```

## Local Pending Navigation

Pending indicators can also be localized to the link. NavLink's children, className, and style props can be functions that receive the pending state.

```tsx
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <NavLink to="/home">
        {({ isPending }) => (
          <span>Home {isPending && <Spinner />}</span>
        )}
      </NavLink>
      <NavLink
        to="/about"
        style={({ isPending }) => ({
          color: isPending ? "gray" : "black",
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## Pending Form Submission

When a form is submitted, the UI should immediately respond to the user's actions with a pending state. This is easiest to do with a [fetcher][use_fetcher] form because it has its own independent state (whereas normal forms cause a global navigation).

```tsx filename=app/project.tsx lines=[10-12]
import { useFetcher } from "react-router";

function NewProjectForm() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <input type="text" name="title" />
      <button type="submit">
        {fetcher.state !== "idle"
          ? "Submitting..."
          : "Submit"}
      </button>
    </fetcher.Form>
  );
}
```

For non-fetcher form submissions, pending states are available on `useNavigation`.

```tsx filename=app/projects/new.tsx
import { useNavigation, Form } from "react-router";

function NewProjectForm() {
  const navigation = useNavigation();

  return (
    <Form method="post" action="/projects/new">
      <input type="text" name="title" />
      <button type="submit">
        {navigation.formAction === "/projects/new"
          ? "Submitting..."
          : "Submit"}
      </button>
    </Form>
  );
}
```

## Optimistic UI

When the future state of the UI is known by the form submission data, an optimistic UI can be implemented for instant UX.

```tsx filename=app/project.tsx lines=[4-7]
function Task({ task }) {
  const fetcher = useFetcher();

  let isComplete = task.status === "complete";
  if (fetcher.formData) {
    isComplete =
      fetcher.formData.get("status") === "complete";
  }

  return (
    <div>
      <div>{task.title}</div>
      <fetcher.Form method="post">
        <button
          name="status"
          value={isComplete ? "incomplete" : "complete"}
        >
          {isComplete ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </fetcher.Form>
    </div>
  );
}
```

---

Next: [Testing](./testing)

[use_fetcher]: https://api.reactrouter.com/v7/functions/react-router.useFetcher.html

---
---
title: Testing
order: 9
---

# Testing

[MODES: framework, data]

## Introduction

When components use things like `useLoaderData`, `<Link>`, etc, they are required to be rendered in context of a React Router app. The `createRoutesStub` function creates that context to test components in isolation.

Consider a login form component that relies on `useActionData`

```tsx
import { useActionData } from "react-router";

export function LoginForm() {
  const actionData = useActionData();
  const errors = actionData?.errors;
  return (
    <Form method="post">
      <label>
        <input type="text" name="username" />
        {errors?.username && <div>{errors.username}</div>}
      </label>

      <label>
        <input type="password" name="password" />
        {errors?.password && <div>{errors.password}</div>}
      </label>

      <button type="submit">Login</button>
    </Form>
  );
}
```

We can test this component with `createRoutesStub`. It takes an array of objects that resemble route modules with loaders, actions, and components.

```tsx
import { createRoutesStub } from "react-router";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

test("LoginForm renders error messages", async () => {
  const USER_MESSAGE = "Username is required";
  const PASSWORD_MESSAGE = "Password is required";

  const Stub = createRoutesStub([
    {
      path: "/login",
      Component: LoginForm,
      action() {
        return {
          errors: {
            username: USER_MESSAGE,
            password: PASSWORD_MESSAGE,
          },
        };
      },
    },
  ]);

  // render the app stub at "/login"
  render(<Stub initialEntries={["/login"]} />);

  // simulate interactions
  userEvent.click(screen.getByText("Login"));
  await waitFor(() => screen.findByText(USER_MESSAGE));
  await waitFor(() => screen.findByText(PASSWORD_MESSAGE));
});
```

## Using with Framework Mode Types

It's important to note that `createRoutesStub` is designed for _unit_ testing of reusable components in your application that rely on contextual router information (i.e., `loaderData`, `actionData`, `matches`). These components usually obtain this information via the hooks (`useLoaderData`, `useActionData`, `useMatches`) or via props passed down from the ancestor route component. We **strongly** recommend limiting your usage of `createRoutesStub` to unit testing of these types of reusable components.

`createRoutesStub` is _not designed_ for (and is arguably incompatible with) direct testing of Route components using the [`Route.\*`](../../explanation/type-safety) types available in Framework Mode. This is because the `Route.*` types are derived from your actual application - including the real `loader`/`action` functions as well as the structure of your route tree structure (which defines the `matches` type). When you use `createRoutesStub`, you are providing stubbed values for `loaderData`, `actionData`, and even your `matches` based on the route tree you pass to `createRoutesStub`. Therefore, the types won't align with the `Route.*` types and you'll get type issues trying to use a route component in a route stub.

```tsx filename=routes/login.tsx
export default function Login({
  actionData,
}: Route.ComponentProps) {
  return <Form method="post">...</Form>;
}
```

```tsx filename=routes/login.test.tsx
import LoginRoute from "./login";

test("LoginRoute renders error messages", async () => {
  const Stub = createRoutesStub([
    {
      path: "/login",
      Component: LoginRoute,
      // ^ ❌ Types of property 'matches' are incompatible.
      action() {
        /*...*/
      },
    },
  ]);

  // ...
});
```

These type errors are generally accurate if you try to setup your tests like this. As long as your stubbed `loader`/`action` functions match your real implementations, then the types for `loaderData`/`actionData` will be correct, but if they differ your types will be lying to you.

`matches` is more complicated since you don't usually stub out all of the ancestor routes. In this example, there is no `root` route so `matches` will only contain your test route, while it will contain the root route and any other ancestors at runtime. There's no great way to automatically align the typegen types with the runtime types in your test.

Therefore, if you need to test Route level components, we recommend you do that via an Integration/E2E test (Playwright, Cypress, etc.) against a running application because you're venturing out of unit testing territory when testing your route as a whole.

If you _need_ to write a unit test against the route, you can add a `@ts-expect-error` comment in your test to silence the TypeScript error:

```tsx
const Stub = createRoutesStub([
  {
    path: "/login",
    // @ts-expect-error: `matches` won't align between test code and app code
    Component: LoginRoute,
    action() {
      /*...*/
    },
  },
]);
```
---

---
title: Deploying
order: 10
---

# Deploying

[MODES: framework]

## Introduction

React Router can be deployed two ways:

- Fullstack Hosting
- Static Hosting

The official [React Router templates](https://github.com/remix-run/react-router-templates) can help you bootstrap an application or be used as a reference for your own application.

When deploying to static hosting, you can deploy React Router the same as any other single page application with React.

## Templates

After running the `create-react-router` command, make sure to follow the instructions in the README.

### Node.js with Docker

```
npx create-react-router@latest --template remix-run/react-router-templates/default
```

- Server Rendering
- Tailwind CSS

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Node with Docker (Custom Server)

```
npx create-react-router@latest --template remix-run/react-router-templates/node-custom-server
```

- Server Rendering
- Tailwind CSS
- Custom express server for more control

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Node with Docker and Postgres

```
npx create-react-router@latest --template remix-run/react-router-templates/node-postgres
```

- Server Rendering
- Postgres Database with Drizzle
- Tailwind CSS
- Custom express server for more control

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Vercel

Vercel maintains their own template for React Router. Checkout the [Vercel Guide](https://vercel.com/templates/react-router/react-router-boilerplate) for more information.

### Cloudflare Workers

Cloudflare maintains their own template for React Router. Checkout the [Cloudflare Guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/) for more information.

### Netlify

Netlify maintains their own template for React Router. Checkout the [Netlify Guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/react-router/) for more information.

### EdgeOne Pages

EdgeOne Pages maintains their own template for React Router. Checkout the [EdgeOne Pages Guide](https://pages.edgeone.ai/document/framework-react-router) for more information.
