import { i as formatDateRange, r as expeditionsQuery, t as REGIONS } from "./archive-BAygvr60.js";
import { n as SiteShell, t as PageHeader } from "./site-shell-B7diJaeh.js";
import { t as imageFor } from "./images-B07BjDLa.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Users } from "lucide-react";
//#region src/routes/expeditions.index.tsx?tsr-split=component
function ExpeditionExplorer() {
	const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
	const [region, setRegion] = useState("All");
	const [year, setYear] = useState("All");
	const [theme, setTheme] = useState("All");
	const years = useMemo(() => Array.from(new Set(expeditions.map((e) => e.year))).sort((a, b) => b - a), [expeditions]);
	const themes = useMemo(() => Array.from(new Set(expeditions.flatMap((e) => e.themes))).sort(), [expeditions]);
	const filtered = expeditions.filter((e) => (region === "All" || e.region === region) && (year === "All" || String(e.year) === year) && (theme === "All" || e.themes.includes(theme)));
	return /* @__PURE__ */ jsxs(SiteShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Interactive explorer",
			title: "Expedition Explorer",
			intro: "Every recorded campaign, filterable by region, season and research theme. Open any expedition for its team, route, datasets, reports and field media."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-card",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl flex-wrap gap-8 px-5 py-6",
				children: [
					/* @__PURE__ */ jsx(FilterGroup, {
						label: "Region",
						value: region,
						onChange: setRegion,
						options: ["All", ...REGIONS]
					}),
					/* @__PURE__ */ jsx(FilterGroup, {
						label: "Season",
						value: year,
						onChange: setYear,
						options: ["All", ...years.map(String)]
					}),
					/* @__PURE__ */ jsx(FilterGroup, {
						label: "Theme",
						value: theme,
						onChange: setTheme,
						options: ["All", ...themes]
					})
				]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-12",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "label-caps text-muted-foreground",
					children: [
						filtered.length,
						" expedition",
						filtered.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 grid gap-4 lg:grid-cols-4",
					children: REGIONS.map((r) => {
						const count = filtered.filter((e) => e.region === r).length;
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setRegion(region === r ? "All" : r),
							className: cn("rounded-sm border p-5 text-left transition-colors", region === r ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/60"),
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "label-caps text-muted-foreground",
									children: r
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 font-display text-3xl font-semibold",
									children: count
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground",
									children: "in current view"
								})
							]
						}, r);
					})
				}),
				/* @__PURE__ */ jsx("ol", {
					className: "mt-12 space-y-px border-l-2 border-border",
					children: filtered.map((exp) => /* @__PURE__ */ jsxs("li", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("span", { className: "absolute -left-[7px] top-9 size-3 rounded-full bg-accent" }), /* @__PURE__ */ jsxs(Link, {
							to: "/expeditions/$slug",
							params: { slug: exp.slug },
							className: "group grid gap-6 bg-card p-6 pl-8 transition-colors hover:bg-ice/30 md:grid-cols-[200px_1fr_auto] md:items-center",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: imageFor(exp.image_key),
									alt: exp.name,
									loading: "lazy",
									width: 1600,
									height: 1008,
									className: "h-32 w-full rounded-sm object-cover md:h-24"
								}),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("p", {
										className: "label-caps text-accent",
										children: [
											exp.code,
											" · ",
											exp.region
										]
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "mt-2 text-xl font-semibold",
										children: exp.name
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											formatDateRange(exp.start_date, exp.end_date),
											" ·",
											" ",
											exp.platform
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 max-w-2xl line-clamp-2 text-sm",
										children: exp.summary
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: exp.themes.map((t) => /* @__PURE__ */ jsx("span", {
											className: "rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground",
											children: t
										}, t))
									})
								] }),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 text-sm text-muted-foreground md:flex-col md:items-end",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx(Users, { className: "size-4" }),
											" ",
											exp.team_size
										]
									}), /* @__PURE__ */ jsx(ArrowRight, { className: "size-5 text-primary transition-transform group-hover:translate-x-1" })]
								})
							]
						})]
					}, exp.id))
				}),
				filtered.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "mt-12 text-sm text-muted-foreground",
					children: "No expeditions match these filters. Try widening your selection."
				})
			]
		})
	] });
}
function FilterGroup({ label, value, onChange, options }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
		className: "label-caps text-muted-foreground",
		children: label
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: options.map((option) => /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onChange(option),
			className: cn("rounded-sm border px-3 py-1.5 text-sm transition-colors", value === option ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"),
			children: option
		}, option))
	})] });
}
//#endregion
export { ExpeditionExplorer as component };
