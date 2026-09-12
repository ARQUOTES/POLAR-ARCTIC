import { a as mediaQuery, n as activitiesQuery, o as repositoryQuery, r as expeditionsQuery } from "./archive-BAygvr60.js";
import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/outreach.tsx
var $$splitComponentImporter = () => import("./outreach-Dyo-NJIS.js");
var Route = createFileRoute("/outreach")({
	validateSearch: (search) => typeof search["source"] === "string" ? { source: search["source"] } : {},
	head: () => ({ meta: [
		{ title: "Outreach Studio — Polar Science Portal" },
		{
			name: "description",
			content: "Turn any archived expedition, dataset, publication or photograph into ready-to-publish social posts, press notes and newsletter copy."
		},
		{
			property: "og:title",
			content: "Outreach Studio"
		},
		{
			property: "og:description",
			content: "Automated outreach and media copy generated from the polar science archive."
		}
	] }),
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(expeditionsQuery),
			context.queryClient.ensureQueryData(repositoryQuery),
			context.queryClient.ensureQueryData(mediaQuery),
			context.queryClient.ensureQueryData(activitiesQuery)
		]);
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
