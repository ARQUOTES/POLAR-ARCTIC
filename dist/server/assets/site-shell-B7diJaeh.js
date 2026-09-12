import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { LogIn, Snowflake } from "lucide-react";
//#region src/components/site-shell.tsx
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/expeditions",
		label: "Expeditions"
	},
	{
		to: "/repository",
		label: "Repository"
	},
	{
		to: "/media",
		label: "Media"
	},
	{
		to: "/activities",
		label: "Activities"
	},
	{
		to: "/outreach",
		label: "Outreach Studio"
	},
	{
		to: "/about",
		label: "About"
	}
];
function SiteShell({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-40 border-b border-border/60 bg-deep text-deep-foreground",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4",
					children: [
						/* @__PURE__ */ jsxs(Link, {
							to: "/",
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "flex size-9 items-center justify-center rounded-sm bg-accent text-accent-foreground",
								children: /* @__PURE__ */ jsx(Snowflake, { className: "size-5" })
							}), /* @__PURE__ */ jsxs("span", {
								className: "leading-tight",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block font-display text-base font-semibold tracking-tight",
									children: "Polar Science Portal"
								}), /* @__PURE__ */ jsx("span", {
									className: "label-caps block text-deep-foreground/60",
									children: "Science · Archive · Outreach"
								})]
							})]
						}),
						/* @__PURE__ */ jsx("nav", {
							className: "flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 text-sm",
							children: nav.map((item) => /* @__PURE__ */ jsx(Link, {
								to: item.to,
								activeOptions: { exact: item.to === "/" },
								className: "text-deep-foreground/70 transition-colors hover:text-accent",
								activeProps: { className: "text-accent font-medium" },
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/login",
							className: "ml-auto inline-flex items-center gap-2 rounded-sm border border-deep-foreground/35 px-3.5 py-2 text-sm font-medium text-deep-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground",
							children: [/* @__PURE__ */ jsx(LogIn, { className: "size-4" }), "Login"]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ jsxs("footer", {
				className: "border-t border-border bg-deep text-deep-foreground/70",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-display text-base font-semibold text-deep-foreground",
							children: "Polar Science Portal"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2 max-w-xs text-sm",
							children: "A single home for polar expedition records, open scientific data, publications and public outreach material."
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "label-caps text-deep-foreground/50",
							children: "Explore"
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: nav.slice(1).map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: item.to,
								className: "hover:text-accent",
								children: item.label
							}) }, item.to))
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "label-caps text-deep-foreground/50",
							children: "Regions covered"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ jsx("li", { children: "Antarctic stations" }),
								/* @__PURE__ */ jsx("li", { children: "Arctic — Ny-Ålesund" }),
								/* @__PURE__ */ jsx("li", { children: "Southern Ocean cruises" }),
								/* @__PURE__ */ jsx("li", { children: "Himalayan cryosphere" })
							]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "label-caps text-deep-foreground/50",
							children: "Data use"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm",
							children: "Archive records are published for research and education. Cite the dataset or report reference shown on each entry."
						})] })
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "border-t border-border/30 px-5 py-5 text-center text-xs",
					children: "Polar Science Outreach & Knowledge Repository"
				})]
			})
		]
	});
}
function PageHeader({ eyebrow, title, intro }) {
	return /* @__PURE__ */ jsx("section", {
		className: "border-b border-border bg-ice/40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 py-14",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "label-caps text-accent",
					children: eyebrow
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl",
					children: title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 max-w-2xl text-base text-muted-foreground",
					children: intro
				})
			]
		})
	});
}
//#endregion
export { SiteShell as n, PageHeader as t };
