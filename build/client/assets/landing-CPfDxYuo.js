import { Link, UNSAFE_withComponentProps } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/landing.tsx
var meta = () => [{ title: "SaaS Kit - Build Faster" }, {
	name: "description",
	content: "A complete SaaS starter kit with React 19, React Router 7, Convex, and Clerk."
}];
var landing_default = UNSAFE_withComponentProps(function Landing() {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ jsx("section", {
			className: "py-20 px-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container mx-auto text-center max-w-4xl",
				children: [
					/* @__PURE__ */ jsxs("h1", {
						className: "text-4xl md:text-6xl font-bold tracking-tight mb-6",
						children: ["Build Your SaaS Application", /* @__PURE__ */ jsx("span", {
							className: "text-primary block",
							children: "Faster Than Ever"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xl text-muted-foreground mb-8 max-w-2xl mx-auto",
						children: "A complete starter kit with React 19, React Router 7, Convex, and Clerk. Everything you need to launch your SaaS application quickly."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row gap-4 justify-center",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/sign-up",
							className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
							children: "Get Started Free"
						}), /* @__PURE__ */ jsx(Link, {
							to: "/pricing",
							className: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2",
							children: "View Pricing"
						})]
					})
				]
			})
		})
	});
});
//#endregion
export { landing_default as default, meta };
