import { o as repositoryQuery } from "./archive-BAygvr60.js";
import { n as SiteShell, t as PageHeader } from "./site-shell-B7diJaeh.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Download, Search } from "lucide-react";
//#region src/routes/repository.tsx?tsr-split=component
var TYPES = [
	"All",
	"report",
	"dataset",
	"publication"
];
function RepositoryPage() {
	const { data: items } = useSuspenseQuery(repositoryQuery);
	const [type, setType] = useState("All");
	const [theme, setTheme] = useState("All");
	const [year, setYear] = useState("All");
	const [search, setSearch] = useState("");
	const themes = useMemo(() => Array.from(new Set(items.map((i) => i.theme))).sort(), [items]);
	const years = useMemo(() => Array.from(new Set(items.map((i) => i.year))).sort((a, b) => b - a), [items]);
	const term = search.trim().toLowerCase();
	const filtered = items.filter((i) => (type === "All" || i.item_type === type) && (theme === "All" || i.theme === theme) && (year === "All" || String(i.year) === year) && (term === "" || `${i.title} ${i.authors} ${i.abstract} ${i.reference}`.toLowerCase().includes(term)));
	return /* @__PURE__ */ jsxs(SiteShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Knowledge repository",
			title: "Reports, datasets and publications",
			intro: "One searchable archive across every campaign. Each entry carries its citation reference, format and originating expedition."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-card",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl space-y-5 px-5 py-6",
				children: [/* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-3 rounded-sm border border-border px-4 py-2.5",
					children: [/* @__PURE__ */ jsx(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: "Search titles, authors, abstracts and references",
						className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-8",
					children: [
						/* @__PURE__ */ jsx(Chips, {
							label: "Type",
							value: type,
							onChange: setType,
							options: TYPES
						}),
						/* @__PURE__ */ jsx(Chips, {
							label: "Theme",
							value: theme,
							onChange: setTheme,
							options: ["All", ...themes]
						}),
						/* @__PURE__ */ jsx(Chips, {
							label: "Year",
							value: year,
							onChange: setYear,
							options: ["All", ...years.map(String)]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-12",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "label-caps text-muted-foreground",
					children: [filtered.length, " records"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 divide-y divide-border border-y border-border",
					children: filtered.map((item) => /* @__PURE__ */ jsxs("article", {
						className: "grid gap-4 py-6 md:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "label-caps text-accent",
								children: [
									item.item_type,
									" · ",
									item.theme,
									" · ",
									item.year
								]
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-2 text-lg font-semibold",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: item.authors
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-3xl text-sm",
								children: item.abstract
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 font-mono text-xs text-muted-foreground",
								children: item.reference
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-start gap-2 md:items-end",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground",
								children: [
									item.file_format,
									" · ",
									item.file_size
								]
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								className: "inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-sm hover:border-accent hover:text-accent",
								children: [/* @__PURE__ */ jsx(Download, { className: "size-4" }), " Request file"]
							})]
						})]
					}, item.id))
				}),
				filtered.length === 0 && /* @__PURE__ */ jsx("p", {
					className: "mt-10 text-sm text-muted-foreground",
					children: "No records match this search."
				})
			]
		})
	] });
}
function Chips({ label, value, onChange, options }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
		className: "label-caps text-muted-foreground",
		children: label
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: options.map((option) => /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => onChange(option),
			className: cn("rounded-sm border px-3 py-1.5 text-sm capitalize transition-colors", value === option ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"),
			children: option
		}, option))
	})] });
}
//#endregion
export { RepositoryPage as component };
