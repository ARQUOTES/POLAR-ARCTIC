import { a as mediaQuery, i as formatDateRange, r as expeditionsQuery } from "./archive-BAygvr60.js";
import { n as SiteShell, t as PageHeader } from "./site-shell-B7diJaeh.js";
import { t as imageFor } from "./images-B07BjDLa.js";
import { t as cn } from "./utils-C_uf36nf.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Play, X } from "lucide-react";
//#region src/routes/media.tsx?tsr-split=component
function MediaPage() {
	const { data: media } = useSuspenseQuery(mediaQuery);
	const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
	const [kind, setKind] = useState("All");
	const [expedition, setExpedition] = useState("All");
	const [active, setActive] = useState(null);
	const expeditionName = useMemo(() => {
		const map = new Map(expeditions.map((e) => [e.slug, e.name]));
		return (slug) => slug ? map.get(slug) ?? "" : "";
	}, [expeditions]);
	const filtered = media.filter((m) => (kind === "All" || m.kind === kind) && (expedition === "All" || m.expedition_slug === expedition));
	return /* @__PURE__ */ jsxs(SiteShell, { children: [
		/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Media dissemination",
			title: "Photographs and films from the field",
			intro: "Cleared imagery and documentary films from every campaign, ready for classrooms, press use and public exhibitions with credit."
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-card",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl flex-wrap gap-8 px-5 py-6",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "label-caps text-muted-foreground",
					children: "Format"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-2 flex gap-2",
					children: [
						"All",
						"photo",
						"video"
					].map((option) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setKind(option),
						className: cn("rounded-sm border px-3 py-1.5 text-sm capitalize transition-colors", kind === option ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"),
						children: option
					}, option))
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "min-w-64",
					children: [/* @__PURE__ */ jsx("p", {
						className: "label-caps text-muted-foreground",
						children: "Expedition"
					}), /* @__PURE__ */ jsxs("select", {
						value: expedition,
						onChange: (event) => setExpedition(event.target.value),
						className: "mt-2 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm",
						children: [/* @__PURE__ */ jsx("option", {
							value: "All",
							children: "All expeditions"
						}), expeditions.map((e) => /* @__PURE__ */ jsx("option", {
							value: e.slug,
							children: e.name
						}, e.slug))]
					})]
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-12",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "label-caps text-muted-foreground",
				children: [filtered.length, " items"]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((item) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setActive(item),
					className: "group overflow-hidden rounded-sm border border-border text-left",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("img", {
							src: imageFor(item.image_key),
							alt: item.title,
							loading: "lazy",
							width: 1600,
							height: 1008,
							className: "h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
						}), item.kind === "video" && /* @__PURE__ */ jsxs("span", {
							className: "absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-sm bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground",
							children: [
								/* @__PURE__ */ jsx(Play, { className: "size-3" }),
								" ",
								item.duration
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-card p-4",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "label-caps text-muted-foreground",
								children: item.theme
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 font-medium",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: expeditionName(item.expedition_slug)
							})
						]
					})]
				}, item.id))
			})]
		}),
		active && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-deep/90 p-5",
			onClick: () => setActive(null),
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-h-full w-full max-w-4xl overflow-auto rounded-sm bg-card",
				onClick: (event) => event.stopPropagation(),
				children: [/* @__PURE__ */ jsx("img", {
					src: imageFor(active.image_key),
					alt: active.title,
					width: 1600,
					height: 1008,
					className: "max-h-[60vh] w-full object-cover"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-6 p-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("p", {
							className: "label-caps text-accent",
							children: [
								active.kind === "video" ? `Film · ${active.duration}` : "Photograph",
								" ",
								"· ",
								active.theme
							]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-2 text-xl font-semibold",
							children: active.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm",
							children: active.caption
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								active.credit,
								active.captured_on ? ` · ${formatDateRange(active.captured_on)}` : "",
								active.expedition_slug ? ` · ${expeditionName(active.expedition_slug)}` : ""
							]
						})
					] }), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setActive(null),
						"aria-label": "Close",
						className: "rounded-sm border border-border p-2 hover:border-accent",
						children: /* @__PURE__ */ jsx(X, { className: "size-4" })
					})]
				})]
			})
		})
	] });
}
//#endregion
export { MediaPage as component };
