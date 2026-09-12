import { i as formatDateRange, n as activitiesQuery } from "./archive-BAygvr60.js";
import { n as SiteShell, t as PageHeader } from "./site-shell-B7diJaeh.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Users } from "lucide-react";
//#region src/routes/activities.tsx?tsr-split=component
function ActivitiesPage() {
	const { data: activities } = useSuspenseQuery(activitiesQuery);
	const today = /* @__PURE__ */ new Date("2026-09-12");
	const upcoming = activities.filter((a) => new Date(a.ends_on ?? a.starts_on) >= today).sort((a, b) => a.starts_on.localeCompare(b.starts_on));
	const past = activities.filter((a) => new Date(a.ends_on ?? a.starts_on) < today).sort((a, b) => b.starts_on.localeCompare(a.starts_on));
	return /* @__PURE__ */ jsxs(SiteShell, { children: [/* @__PURE__ */ jsx(PageHeader, {
		eyebrow: "Outreach and institutional life",
		title: "Activities, programmes and events",
		intro: "Public outreach programmes, scientific symposia, training workshops and institutional meetings across the polar research calendar."
	}), /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-7xl px-5 py-14",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-2xl font-semibold",
				children: "Upcoming"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8 grid gap-px bg-border md:grid-cols-2",
				children: upcoming.map((activity) => /* @__PURE__ */ jsx(ActivityCard, { activity }, activity.id))
			}),
			upcoming.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "No scheduled activities right now."
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-16 text-2xl font-semibold",
				children: "Past activities"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8 grid gap-px bg-border md:grid-cols-2",
				children: past.map((activity) => /* @__PURE__ */ jsx(ActivityCard, { activity }, activity.id))
			})
		]
	})] });
}
function ActivityCard({ activity }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "bg-card p-6",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "label-caps text-accent",
				children: activity.activity_type
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-3 text-lg font-semibold",
				children: activity.title
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(CalendarDays, { className: "size-4" }), formatDateRange(activity.starts_on, activity.ends_on)]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(MapPin, { className: "size-4" }), activity.location]
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Users, { className: "size-4" }), activity.audience]
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-4 text-sm",
				children: activity.description
			})
		]
	});
}
//#endregion
export { ActivitiesPage as component };
