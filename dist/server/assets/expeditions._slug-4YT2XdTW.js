import { a as mediaQuery, o as repositoryQuery, r as expeditionsQuery } from "./archive-BAygvr60.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/expeditions.$slug.tsx
var $$splitComponentImporter = () => import("./expeditions._slug-BQnP9JUM.js");
var Route = createFileRoute("/expeditions/$slug")({
	loader: async ({ context, params }) => {
		const [expeditions] = await Promise.all([
			context.queryClient.ensureQueryData(expeditionsQuery),
			context.queryClient.ensureQueryData(repositoryQuery),
			context.queryClient.ensureQueryData(mediaQuery)
		]);
		const expedition = expeditions.find((e) => e.slug === params.slug);
		if (!expedition) throw notFound();
		return {
			name: expedition.name,
			summary: expedition.summary
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Expedition unavailable" }, {
			name: "robots",
			content: "noindex"
		}] };
		return { meta: [
			{ title: `${loaderData.name} — Polar Science Portal` },
			{
				name: "description",
				content: loaderData.summary.slice(0, 155)
			},
			{
				property: "og:title",
				content: loaderData.name
			},
			{
				property: "og:description",
				content: loaderData.summary.slice(0, 155)
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
