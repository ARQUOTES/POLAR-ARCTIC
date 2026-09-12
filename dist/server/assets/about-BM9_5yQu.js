import { n as SiteShell, t as PageHeader } from "./site-shell-B7diJaeh.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Code2, Globe2, Users } from "lucide-react";
//#region src/routes/about.tsx?tsr-split=component
var developers = [
	{
		name: "Ankurak Roy",
		role: "Project Lead",
		initials: "AR",
		focus: "Product strategy and polar research partnerships."
	},
	{
		name: "Kinjal Pramanik",
		role: "Team Member",
		initials: "KP",
		focus: "Accessible interfaces and visual systems."
	},
	{
		name: "Souvick Saha",
		role: "Team Member",
		initials: "SS",
		focus: "Archive services, APIs and secure data flows."
	},
	{
		name: "Aryan Chowdhury",
		role: "Team Member",
		initials: "AC",
		focus: "Scientific datasets and metadata reliability."
	},
	{
		name: "Sampad Chakraborty",
		role: "Team Member",
		initials: "SC",
		focus: "Researcher and public outreach experiences."
	},
	{
		name: "Sneha Sarkar",
		role: "Team Member",
		initials: "SS",
		focus: "Testing, performance and release quality."
	}
];
function AboutPage() {
	return /* @__PURE__ */ jsxs(SiteShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "The people behind the portal",
			title: "Built for discoveries that matter.",
			intro: "We bring polar science, open knowledge and thoughtful technology together so research can travel farther."
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-16",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-8 border-b border-border pb-14 md:grid-cols-[1fr_2fr]",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "label-caps text-accent",
						children: "Our mission"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-3 text-3xl font-semibold",
						children: "Make polar knowledge easier to find, understand and share."
					})] }), /* @__PURE__ */ jsx("p", {
						className: "max-w-2xl text-base leading-relaxed text-muted-foreground",
						children: "The Polar Science Portal unites expedition records, scientific data and outreach resources in a dependable public archive. Our multidisciplinary team designs every part of the experience for clarity, accessibility and lasting value."
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-14 flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Users, { className: "size-5 text-accent" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "label-caps text-accent",
						children: "Development team"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-1 text-2xl font-semibold",
						children: "Six people, one shared mission"
					})] })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: developers.map((developer) => /* @__PURE__ */ jsxs("article", {
						className: "group border border-border bg-card p-6 transition-colors hover:border-accent/70 hover:bg-ice/30",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex size-12 items-center justify-center rounded-sm bg-deep font-display text-sm font-semibold text-accent",
									children: developer.initials
								}), /* @__PURE__ */ jsx(Code2, { className: "size-5 text-muted-foreground transition-colors group-hover:text-accent" })]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-7 label-caps text-accent",
								children: developer.role
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-2 text-xl font-semibold",
								children: developer.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: developer.focus
							})
						]
					}, developer.name))
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-t border-border bg-deep text-deep-foreground",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl flex-wrap items-center gap-5 px-5 py-12",
				children: [/* @__PURE__ */ jsx(Globe2, { className: "size-8 text-accent" }), /* @__PURE__ */ jsx("p", {
					className: "max-w-2xl text-lg text-deep-foreground/80",
					children: "Designed in collaboration with the people who collect, interpret and communicate polar science."
				})]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
