import { a as mediaQuery, i as formatDateRange, n as activitiesQuery, o as repositoryQuery, r as expeditionsQuery } from "./archive-BAygvr60.js";
import { n as SiteShell } from "./site-shell-B7diJaeh.js";
import { t as imageFor } from "./images-B07BjDLa.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Compass, Database, FileText, Film } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function HomePage() {
	const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
	const { data: repository } = useSuspenseQuery(repositoryQuery);
	const { data: media } = useSuspenseQuery(mediaQuery);
	const { data: activities } = useSuspenseQuery(activitiesQuery);
	const featured = expeditions[0];
	const publications = repository.filter((item) => item.item_type === "publication").slice(0, 4);
	const latestMedia = media.slice(0, 6);
	const upcoming = activities.filter((a) => new Date(a.starts_on) >= /* @__PURE__ */ new Date("2025-11-01")).slice(0, 3);
	const stats = [
		{
			icon: Compass,
			value: expeditions.length,
			label: "Expeditions archived"
		},
		{
			icon: Database,
			value: repository.filter((r) => r.item_type === "dataset").length,
			label: "Open datasets"
		},
		{
			icon: FileText,
			value: repository.filter((r) => r.item_type !== "dataset").length,
			label: "Reports & publications"
		},
		{
			icon: Film,
			value: media.length,
			label: "Photos & films"
		}
	];
	return /* @__PURE__ */ jsxs(SiteShell, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative isolate overflow-hidden bg-deep text-deep-foreground",
			children: [/* @__PURE__ */ jsx("img", {
				src: imageFor(featured?.image_key),
				alt: "Polar ice landscape from a recent expedition",
				width: 1600,
				height: 1008,
				className: "absolute inset-0 size-full object-cover opacity-40"
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto max-w-7xl px-5 py-28",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "label-caps text-accent",
						children: "Integrated polar knowledge portal"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-6xl",
						children: "Every expedition, dataset and story from the poles — in one place."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-2xl text-lg text-deep-foreground/80",
						children: "Expedition records, open scientific data, peer-reviewed publications, field photography and institutional activities, published together with tools that turn research into public outreach."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-9 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsxs(Link, {
							to: "/expeditions",
							className: "inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90",
							children: ["Open the expedition explorer ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
						}), /* @__PURE__ */ jsx(Link, {
							to: "/outreach",
							className: "inline-flex items-center gap-2 rounded-sm border border-deep-foreground/30 px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent",
							children: "Generate outreach content"
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-card",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border lg:grid-cols-4",
				children: stats.map((stat) => /* @__PURE__ */ jsxs("div", {
					className: "bg-card px-6 py-8",
					children: [
						/* @__PURE__ */ jsx(stat.icon, { className: "size-5 text-accent" }),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 font-display text-4xl font-semibold",
							children: stat.value
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: stat.label
						})
					]
				}, stat.label))
			})
		}),
		featured && /* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-16",
			children: [/* @__PURE__ */ jsx("p", {
				className: "label-caps text-accent",
				children: "Featured expedition"
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr]",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl font-semibold",
						children: featured.name
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							featured.code,
							" · ",
							featured.region,
							" ·",
							" ",
							formatDateRange(featured.start_date, featured.end_date)
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-base leading-relaxed",
						children: featured.summary
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-6 space-y-2 border-l-2 border-accent pl-5 text-sm",
						children: featured.highlights.map((highlight) => /* @__PURE__ */ jsx("li", { children: highlight }, highlight))
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/expeditions/$slug",
						params: { slug: featured.slug },
						className: "mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent",
						children: ["View full expedition record ", /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })]
					})
				] }), /* @__PURE__ */ jsx("img", {
					src: imageFor(featured.image_key),
					alt: featured.name,
					loading: "lazy",
					width: 1600,
					height: 1008,
					className: "h-full w-full rounded-sm object-cover"
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-y border-border bg-ice/30",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-5 py-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-semibold",
						children: "Latest publications"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/repository",
						className: "text-sm font-medium text-primary hover:text-accent",
						children: "Browse the full repository"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 grid gap-px bg-border sm:grid-cols-2",
					children: publications.map((item) => /* @__PURE__ */ jsxs("article", {
						className: "bg-card p-6",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "label-caps text-muted-foreground",
								children: [
									item.theme,
									" · ",
									item.year
								]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 text-lg font-semibold",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: item.authors
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 line-clamp-3 text-sm",
								children: item.abstract
							})
						]
					}, item.id))
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mx-auto max-w-7xl px-5 py-16",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-2xl font-semibold",
					children: "From the field"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/media",
					className: "text-sm font-medium text-primary hover:text-accent",
					children: "Open the media gallery"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: latestMedia.map((item) => /* @__PURE__ */ jsxs("figure", {
					className: "group overflow-hidden rounded-sm border border-border",
					children: [/* @__PURE__ */ jsx("img", {
						src: imageFor(item.image_key),
						alt: item.title,
						loading: "lazy",
						width: 1600,
						height: 1008,
						className: "h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
					}), /* @__PURE__ */ jsxs("figcaption", {
						className: "bg-card p-4",
						children: [/* @__PURE__ */ jsx("p", {
							className: "label-caps text-accent",
							children: item.kind === "video" ? `Film · ${item.duration}` : "Photograph"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2 font-medium",
							children: item.title
						})]
					})]
				}, item.id))
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-t border-border bg-card",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-7xl px-5 py-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-2xl font-semibold",
						children: "Coming up"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/activities",
						className: "text-sm font-medium text-primary hover:text-accent",
						children: "All institutional activities"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 grid gap-6 md:grid-cols-3",
					children: upcoming.map((activity) => /* @__PURE__ */ jsxs("article", {
						className: "border-l-2 border-accent pl-5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "label-caps text-muted-foreground",
								children: activity.activity_type
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-2 text-lg font-semibold",
								children: activity.title
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									formatDateRange(activity.starts_on, activity.ends_on),
									" ·",
									" ",
									activity.location
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-sm",
								children: activity.description
							})
						]
					}, activity.id))
				})]
			})
		})
	] });
}
//#endregion
export { HomePage as component };
