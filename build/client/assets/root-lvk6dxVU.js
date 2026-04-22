import { Links, Meta, Outlet, Scripts, ScrollRestoration, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { clerkMiddleware, rootAuthLoader } from "@clerk/react-router/server";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/root.tsx
var middleware = [clerkMiddleware({ publishedKey: process.env.VITE_CLERK_PUBLISHABLE_KEY })];
var loader = async (args) => {
	const { userId } = await rootAuthLoader(args);
	return { userId };
};
var meta = () => [{ title: "SaaS Kit" }, {
	name: "description",
	content: "A complete SaaS starter kit with React 19, React Router 7, Convex, and Clerk."
}];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function Root() {
	return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Outlet, {}) });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : String(error.status);
		details = error.status === 404 ? "This page could not be found." : error.statusText || details;
	} else if (error instanceof Error) details = error.message;
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-4xl font-bold mb-4",
				children: message
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: details
			})]
		})
	});
});
//#endregion
export { ErrorBoundary, Layout, root_default as default, loader, meta, middleware };
