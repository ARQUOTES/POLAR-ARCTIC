import { a as mediaQuery, i as formatDateRange, o as repositoryQuery, r as expeditionsQuery } from "./archive-BAygvr60.js";
import { t as Route } from "./expeditions._slug-4YT2XdTW.js";
import { n as SiteShell } from "./site-shell-B7diJaeh.js";
import { t as imageFor } from "./images-B07BjDLa.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Users } from "lucide-react";
//#region src/routes/expeditions.$slug.tsx?tsr-split=component
function ExpeditionDetail() {
	const { slug } = Route.useParams();
	const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
	const { data: repository } = useSuspenseQuery(repositoryQuery);
	const { data: media } = useSuspenseQuery(mediaQuery);
	const expedition = expeditions.find((e) => e.slug === slug);
	if (!expedition) return null;
	const records = repository.filter((r) => r.expedition_slug === slug);
	const gallery = media.filter((m) => m.expedition_slug === slug);
	return /* @__PURE__ */ jsxs(SiteShell, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative isolate overflow-hidden bg-deep text-deep-foreground",
			children: [/* @__PURE__ */ jsx("img", {
				src: imageFor(expedition.image_key),
				alt: expedition.name,
				width: 1600,
				height: 1008,
				className: "absolute inset-0 size-full object-cover opacity-35"
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto max-w-7xl px-5 py-20",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/expeditions",
						className: "label-caps text-accent hover:underline",
						children: "← Expedition explorer"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl",
						children: expedition.name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 max-w-3xl text-lg text-deep-foreground/80",
						children: expedition.summary
					}),
					/* @__PURE__ */ jsxs("dl", {
						className: "mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(CalendarDays, { className: "size-4 text-accent" }), formatDateRange(expedition.start_date, expedition.end_date)]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(MapPin, { className: "size-4 text-accent" }),
									expedition.region,
									" · ",
									expedition.platform
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx(Users, { className: "size-4 text-accent" }),
									expedition.team_size,
									" members · led by ",
									expedition.leader
								]
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-2xl font-semibold",
					children: "Season highlights"
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "mt-5 space-y-3 border-l-2 border-accent pl-5",
					children: expedition.highlights.map((h) => /* @__PURE__ */ jsx("li", {
						className: "text-sm",
						children: h
					}, h))
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-12 text-2xl font-semibold",
					children: "Route and stations"
				}),
				/* @__PURE__ */ jsx("ol", {
					className: "mt-5 space-y-px border-l-2 border-border",
					children: expedition.route_stops.map((stop) => /* @__PURE__ */ jsxs("li", {
						className: "relative bg-card p-4 pl-7",
						children: [
							/* @__PURE__ */ jsx("span", { className: "absolute -left-[7px] top-6 size-3 rounded-full bg-primary" }),
							/* @__PURE__ */ jsx("p", {
								className: "font-medium",
								children: stop.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: stop.note
							})
						]
					}, stop.name))
				})
			] }), /* @__PURE__ */ jsxs("aside", { children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-2xl font-semibold",
					children: "Research themes"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: expedition.themes.map((t) => /* @__PURE__ */ jsx("span", {
						className: "rounded-sm bg-ice px-3 py-1.5 text-sm text-ice-foreground",
						children: t
					}, t))
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/outreach",
					search: { source: expedition.slug },
					className: "mt-8 inline-flex rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground hover:opacity-90",
					children: "Create outreach content from this expedition"
				})
			] })]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-y border-border bg-ice/30",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-5 py-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-2xl font-semibold",
					children: "Reports, datasets and publications"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 grid gap-px bg-border md:grid-cols-2",
					children: records.map((item) => /* @__PURE__ */ jsxs("article", {
						className: "bg-card p-6",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "label-caps text-accent",
								children: [
									item.item_type,
									" · ",
									item.file_format,
									" · ",
									item.file_size
								]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 text-lg font-semibold",
								children: item.title
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									item.authors,
									" · ",
									item.reference
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-sm",
								children: item.abstract
							})
						]
					}, item.id))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-16",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-2xl font-semibold",
				children: "Field media"
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: gallery.map((item) => /* @__PURE__ */ jsxs("figure", {
					className: "overflow-hidden rounded-sm border border-border",
					children: [/* @__PURE__ */ jsx("img", {
						src: imageFor(item.image_key),
						alt: item.title,
						loading: "lazy",
						width: 1600,
						height: 1008,
						className: "h-52 w-full object-cover"
					}), /* @__PURE__ */ jsxs("figcaption", {
						className: "bg-card p-4",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "label-caps text-accent",
								children: item.kind === "video" ? `Film · ${item.duration}` : "Photograph"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 font-medium",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: item.caption
							})
						]
					})]
				}, item.id))
			})]
		})
	] });
}
//#endregion
export { ExpeditionDetail as component };
