import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-dMvpFIQf.js";
import { d as TSS_SERVER_FUNCTION, t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as supabase } from "./client-BaABYVKd.js";
import { a as mediaQuery, i as formatDateRange, n as activitiesQuery, o as repositoryQuery, r as expeditionsQuery } from "./archive-BAygvr60.js";
import { t as Route } from "./outreach-CGQO2KKD.js";
import { n as SiteShell, t as PageHeader } from "./site-shell-B7diJaeh.js";
import { t as cn } from "./utils-C_uf36nf.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { isRedirect, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Copy, Loader2, Save, Sparkles } from "lucide-react";
//#region node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/outreach.functions.ts
var InputSchema = z.object({
	sourceType: z.string(),
	sourceTitle: z.string(),
	sourceDetails: z.string(),
	audience: z.string(),
	tone: z.string()
});
var generateOutreach = createServerFn({ method: "POST" }).validator((input) => InputSchema.parse(input)).handler(createSsrRpc("f0a3a5ccbdb22f40ebaaba1816791b4b43b0fa7c01a1b69a1d3ba82387dd442c"));
//#endregion
//#region src/routes/outreach.tsx?tsr-split=component
var AUDIENCES = [
	"School students",
	"Press and media",
	"Researchers",
	"Social media"
];
var TONES = [
	"Plain and factual",
	"Warm and inviting",
	"Formal institutional",
	"Energetic"
];
function OutreachStudio() {
	const { source } = Route.useSearch();
	const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
	const { data: repository } = useSuspenseQuery(repositoryQuery);
	const { data: media } = useSuspenseQuery(mediaQuery);
	const { data: activities } = useSuspenseQuery(activitiesQuery);
	const sources = useMemo(() => [
		...expeditions.map((e) => ({
			key: `expedition:${e.slug}`,
			group: "Expedition",
			title: e.name,
			details: [
				`Code: ${e.code}`,
				`Region: ${e.region}`,
				`Dates: ${formatDateRange(e.start_date, e.end_date)}`,
				`Platform: ${e.platform}`,
				`Leader: ${e.leader}, team of ${e.team_size}`,
				`Themes: ${e.themes.join(", ")}`,
				`Summary: ${e.summary}`,
				`Highlights: ${e.highlights.join("; ")}`
			].join("\n")
		})),
		...repository.map((r) => ({
			key: `repository:${r.id}`,
			group: r.item_type === "dataset" ? "Dataset" : r.item_type === "report" ? "Report" : "Publication",
			title: r.title,
			details: [
				`Type: ${r.item_type}`,
				`Year: ${r.year}`,
				`Theme: ${r.theme}`,
				`Authors: ${r.authors}`,
				`Reference: ${r.reference}`,
				`Abstract: ${r.abstract}`
			].join("\n")
		})),
		...media.map((m) => ({
			key: `media:${m.id}`,
			group: m.kind === "video" ? "Film" : "Photograph",
			title: m.title,
			details: [
				`Format: ${m.kind}`,
				`Theme: ${m.theme}`,
				`Caption: ${m.caption}`,
				`Credit: ${m.credit}`,
				m.captured_on ? `Captured: ${formatDateRange(m.captured_on)}` : ""
			].filter(Boolean).join("\n")
		})),
		...activities.map((a) => ({
			key: `activity:${a.id}`,
			group: "Activity",
			title: a.title,
			details: [
				`Type: ${a.activity_type}`,
				`Dates: ${formatDateRange(a.starts_on, a.ends_on)}`,
				`Location: ${a.location}`,
				`Audience: ${a.audience}`,
				`Description: ${a.description}`
			].join("\n")
		}))
	], [
		expeditions,
		repository,
		media,
		activities
	]);
	const initialKey = source ? `expedition:${source}` : sources[0]?.key ?? "";
	const [selectedKey, setSelectedKey] = useState(initialKey);
	const [audience, setAudience] = useState(AUDIENCES[0]);
	const [tone, setTone] = useState(TONES[0]);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const selected = sources.find((s) => s.key === selectedKey) ?? sources[0];
	const generate = useServerFn(generateOutreach);
	async function handleGenerate() {
		if (!selected) return;
		setLoading(true);
		setResult(null);
		try {
			const output = await generate({ data: {
				sourceType: selected.group,
				sourceTitle: selected.title,
				sourceDetails: selected.details,
				audience,
				tone
			} });
			setResult(output);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "The outreach text could not be generated.");
		} finally {
			setLoading(false);
		}
	}
	async function handleSave() {
		if (!result || !selected) return;
		setSaving(true);
		const { error } = await supabase.from("outreach_drafts").insert({
			source_type: selected.group,
			source_title: selected.title,
			audience,
			tone,
			social_posts: result.social,
			press_note: result.press,
			newsletter: result.newsletter
		});
		setSaving(false);
		if (error) toast.error("The draft could not be saved.");
		else toast.success("Draft saved to the portal.");
	}
	function copy(text) {
		navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard.");
	}
	return /* @__PURE__ */ jsxs(SiteShell, { children: [/* @__PURE__ */ jsx(PageHeader, {
		eyebrow: "Automated media generator",
		title: "Outreach Studio",
		intro: "Pick anything in the archive, choose who it is for, and get social posts, a press note and newsletter copy written from the real record."
	}), /* @__PURE__ */ jsxs("section", {
		className: "mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[380px_1fr]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "label-caps text-muted-foreground",
						children: "1 · Choose an archive item"
					}),
					/* @__PURE__ */ jsx("select", {
						value: selectedKey,
						onChange: (event) => setSelectedKey(event.target.value),
						className: "mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm",
						children: sources.map((option) => /* @__PURE__ */ jsxs("option", {
							value: option.key,
							children: [
								option.group,
								": ",
								option.title
							]
						}, option.key))
					}),
					selected && /* @__PURE__ */ jsx("pre", {
						className: "mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-card p-4 font-sans text-xs text-muted-foreground",
						children: selected.details
					})
				] }),
				/* @__PURE__ */ jsx(Choice, {
					label: "2 · Audience",
					value: audience,
					onChange: setAudience,
					options: AUDIENCES
				}),
				/* @__PURE__ */ jsx(Choice, {
					label: "3 · Tone",
					value: tone,
					onChange: setTone,
					options: TONES
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: handleGenerate,
					disabled: loading,
					className: "inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
					children: [loading ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "size-4" }), loading ? "Writing…" : result ? "Regenerate" : "Generate outreach content"]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [
				!result && !loading && /* @__PURE__ */ jsx("div", {
					className: "rounded-sm border border-dashed border-border p-12 text-center text-sm text-muted-foreground",
					children: "Your generated social posts, press note and newsletter paragraph will appear here."
				}),
				loading && /* @__PURE__ */ jsx("div", {
					className: "rounded-sm border border-border bg-card p-12 text-center text-sm text-muted-foreground",
					children: "Writing outreach copy from the archive record. This usually takes under a minute."
				}),
				result && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(Output, {
						title: "Social posts",
						body: result.social,
						onCopy: copy
					}),
					/* @__PURE__ */ jsx(Output, {
						title: "Press note",
						body: result.press,
						onCopy: copy
					}),
					/* @__PURE__ */ jsx(Output, {
						title: "Newsletter paragraph",
						body: result.newsletter,
						onCopy: copy
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: handleSave,
						disabled: saving,
						className: "inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-sm hover:border-accent hover:text-accent disabled:opacity-60",
						children: [
							/* @__PURE__ */ jsx(Save, { className: "size-4" }),
							" ",
							saving ? "Saving…" : "Save this draft"
						]
					})
				] })
			]
		})]
	})] });
}
function Output({ title, body, onCopy }) {
	if (!body) return null;
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-sm border border-border bg-card",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "flex items-center justify-between border-b border-border px-5 py-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "font-display text-sm font-semibold",
				children: title
			}), /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => onCopy(body),
				className: "inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-accent",
				children: [/* @__PURE__ */ jsx(Copy, { className: "size-3.5" }), " Copy"]
			})]
		}), /* @__PURE__ */ jsx("p", {
			className: "whitespace-pre-wrap px-5 py-4 text-sm leading-relaxed",
			children: body
		})]
	});
}
function Choice({ label, value, onChange, options }) {
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
export { OutreachStudio as component };
