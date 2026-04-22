import { Link, Outlet, UNSAFE_withComponentProps } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/app.tsx
var app_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-b bg-background/95 backdrop-blur",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container mx-auto px-4 h-16 flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "flex items-center space-x-2",
					children: [/* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded bg-primary" }), /* @__PURE__ */ jsx("span", {
						className: "text-xl font-bold",
						children: "SaaS Kit"
					})]
				}), /* @__PURE__ */ jsxs("nav", {
					className: "flex items-center space-x-4",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/pricing",
						className: "text-sm font-medium",
						children: "Pricing"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/dashboard",
						className: "text-sm font-medium",
						children: "Dashboard"
					})]
				})]
			})
		}), /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) })]
	});
});
//#endregion
export { app_default as default };
