import { t as supabase } from "./client-BaABYVKd.js";
import { queryOptions } from "@tanstack/react-query";
//#region src/lib/archive.ts
function unwrap(result) {
	if (result.error) throw new Error(result.error.message);
	return result.data ?? [];
}
async function queryOrEmpty(request) {
	try {
		return unwrap(await request);
	} catch (error) {
		console.error("Archive data could not be loaded:", error);
		return [];
	}
}
var expeditionsQuery = queryOptions({
	queryKey: ["expeditions"],
	queryFn: async () => queryOrEmpty(await supabase.from("expeditions").select("*").order("start_date", { ascending: false }))
});
var repositoryQuery = queryOptions({
	queryKey: ["repository"],
	queryFn: async () => queryOrEmpty(await supabase.from("repository_items").select("*").order("year", { ascending: false }).order("title"))
});
var mediaQuery = queryOptions({
	queryKey: ["media"],
	queryFn: async () => queryOrEmpty(await supabase.from("media_items").select("*").order("captured_on", { ascending: false }))
});
var activitiesQuery = queryOptions({
	queryKey: ["activities"],
	queryFn: async () => queryOrEmpty(await supabase.from("activities").select("*").order("starts_on", { ascending: false }))
});
function formatDateRange(start, end) {
	const fmt = (value) => (/* @__PURE__ */ new Date(value + "T00:00:00Z")).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	});
	if (!end || end === start) return fmt(start);
	return `${fmt(start)} — ${fmt(end)}`;
}
var REGIONS = [
	"Arctic",
	"Antarctic",
	"Southern Ocean",
	"Himalaya"
];
//#endregion
export { mediaQuery as a, formatDateRange as i, activitiesQuery as n, repositoryQuery as o, expeditionsQuery as r, REGIONS as t };
