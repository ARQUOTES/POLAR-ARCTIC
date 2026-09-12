import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/outreach.functions.ts?tss-serverfn-split
var InputSchema = z.object({
	sourceType: z.string(),
	sourceTitle: z.string(),
	sourceDetails: z.string(),
	audience: z.string(),
	tone: z.string()
});
function section(text, start, end) {
	const startIndex = text.indexOf(start);
	if (startIndex === -1) return "";
	const from = startIndex + start.length;
	const to = end ? text.indexOf(end, from) : -1;
	return text.slice(from, to === -1 ? void 0 : to).trim();
}
var generateOutreach_createServerFn_handler = createServerRpc({
	id: "f0a3a5ccbdb22f40ebaaba1816791b4b43b0fa7c01a1b69a1d3ba82387dd442c",
	name: "generateOutreach",
	filename: "src/lib/outreach.functions.ts"
}, (opts) => generateOutreach.__executeServer(opts));
var generateOutreach = createServerFn({ method: "POST" }).validator((input) => InputSchema.parse(input)).handler(generateOutreach_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env["OPENAI_API_KEY"];
	if (!apiKey) throw new Error("AI is not configured. Add OPENAI_API_KEY to your local env file.");
	const openai = createOpenAI({ apiKey });
	const prompt = `You write public communication material for a national polar research institute.

SOURCE TYPE: ${data.sourceType}
TITLE: ${data.sourceTitle}
DETAILS:
${data.sourceDetails}

AUDIENCE: ${data.audience}
TONE: ${data.tone}

Write outreach copy grounded strictly in the details above. Never invent numbers, names, dates or findings that are not given. Use British English.

Return exactly this structure, with these literal headings and nothing before or after:

[SOCIAL]
Three separate social media posts, each on its own line, each under 280 characters, each ending with two or three relevant hashtags.

[PRESS]
A press note of 120 to 160 words with a short headline on the first line.

[NEWSLETTER]
A single newsletter paragraph of 80 to 110 words.`;
	const text = await streamText({
		model: openai("gpt-4o-mini"),
		prompt
	}).text;
	return {
		social: section(text, "[SOCIAL]", "[PRESS]") || text.trim(),
		press: section(text, "[PRESS]", "[NEWSLETTER]"),
		newsletter: section(text, "[NEWSLETTER]")
	};
});
//#endregion
export { generateOutreach_createServerFn_handler };
