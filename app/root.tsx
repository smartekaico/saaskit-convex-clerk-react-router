import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { clerkMiddleware, rootAuthLoader } from '@clerk/react-router/server';
import type { Route } from './+types/root';
import '../src/index.css';

// Clerk middleware for authentication
export const middleware: Route.MiddlewareFunction[] = [
  clerkMiddleware({
    // Protect all /app/* routes by default
    publishedKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
  }),
];

// Root loader to provide auth state to routes
export const loader: Route.LoaderFunction = async (args) => {
  const { userId } = await rootAuthLoader(args);
  return { userId };
};

export const meta: Route.MetaFunction = () => [
  { title: 'SaaS Kit' },
  { name: 'description', content: 'A complete SaaS starter kit with React 19, React Router 7, Convex, and Clerk.' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : String(error.status);
    details = error.status === 404 ? 'This page could not be found.' : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{message}</h1>
        <p className="text-muted-foreground">{details}</p>
      </div>
    </div>
  );
}
