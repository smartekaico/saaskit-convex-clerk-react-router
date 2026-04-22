import { Link, UNSAFE_withComponentProps } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/pricing.tsx
var meta = () => [{ title: "Pricing - SaaS Kit" }];
var pricing_default = UNSAFE_withComponentProps(function Pricing() {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-background py-20 px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl md:text-4xl font-bold mb-4",
					children: "Simple, Transparent Pricing"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-lg text-muted-foreground",
					children: "Choose the plan that fits your needs."
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid md:grid-cols-3 gap-8 max-w-6xl mx-auto",
				children: [
					{
						name: "Free",
						price: "$0",
						period: "/month",
						description: "Perfect for getting started",
						features: [
							"Basic features",
							"Up to 5 projects",
							"Community support"
						]
					},
					{
						name: "Pro",
						price: "$29",
						period: "/month",
						description: "For growing teams",
						features: [
							"All features",
							"Unlimited projects",
							"Priority support",
							"Advanced analytics"
						],
						popular: true
					},
					{
						name: "Enterprise",
						price: "$99",
						period: "/month",
						description: "For large organizations",
						features: [
							"Everything in Pro",
							"Custom integrations",
							"Dedicated support",
							"SLA guarantee"
						]
					}
				].map((plan) => /* @__PURE__ */ jsxs("div", {
					className: `p-6 border rounded-lg ${plan.popular ? "border-primary shadow-lg" : ""}`,
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-xl font-bold",
							children: plan.name
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-2 flex items-baseline",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-3xl font-bold",
								children: plan.price
							}), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground ml-1",
								children: plan.period
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground mt-2",
							children: plan.description
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "mt-4 space-y-2",
							children: plan.features.map((feature) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-center text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "mr-2",
									children: "✓"
								}), feature]
							}, feature))
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/sign-up",
							className: "w-full mt-6 h-10 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center justify-center",
							children: plan.popular ? "Get Started" : "Choose Plan"
						})
					]
				}, plan.name))
			})]
		})
	});
});
//#endregion
export { pricing_default as default, meta };
