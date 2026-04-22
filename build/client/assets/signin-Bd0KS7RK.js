import { Link, UNSAFE_withComponentProps } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/signin.tsx
var meta = () => [{ title: "Sign In - SaaS Kit" }];
var signin_default = UNSAFE_withComponentProps(function SignIn() {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md p-8 space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold",
						children: "Sign In"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground mt-2",
						children: "Enter your credentials to access your account"
					})]
				}),
				/* @__PURE__ */ jsxs("form", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							htmlFor: "email",
							className: "text-sm font-medium",
							children: "Email"
						}), /* @__PURE__ */ jsx("input", {
							id: "email",
							type: "email",
							className: "w-full h-10 px-3 py-2 border rounded-md bg-background",
							placeholder: "you@example.com"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							htmlFor: "password",
							className: "text-sm font-medium",
							children: "Password"
						}), /* @__PURE__ */ jsx("input", {
							id: "password",
							type: "password",
							className: "w-full h-10 px-3 py-2 border rounded-md bg-background",
							placeholder: "••••••••"
						})] }),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "w-full h-10 bg-primary text-primary-foreground rounded-md hover:bg-primary/90",
							children: "Sign In"
						})
					]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-center text-sm",
					children: [
						"Do not have an account?",
						" ",
						/* @__PURE__ */ jsx(Link, {
							to: "/sign-up",
							className: "underline",
							children: "Sign up"
						})
					]
				})
			]
		})
	});
});
//#endregion
export { signin_default as default, meta };
