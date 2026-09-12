import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Copy, Loader2, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, SiteShell } from "@/components/site-shell";
import {
  activitiesQuery,
  expeditionsQuery,
  formatDateRange,
  mediaQuery,
  repositoryQuery,
} from "@/lib/archive";
import {
  generateOutreach,
  type OutreachResult,
} from "@/lib/outreach.functions";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const AUDIENCES = [
  "School students",
  "Press and media",
  "Researchers",
  "Social media",
];
const TONES = [
  "Plain and factual",
  "Warm and inviting",
  "Formal institutional",
  "Energetic",
];

export const Route = createFileRoute("/outreach")({
  validateSearch: (search: Record<string, unknown>): { source?: string } =>
    typeof search["source"] === "string"
      ? { source: search["source"] as string }
      : {},
  head: () => ({
    meta: [
      { title: "Outreach Studio — Polar Science Portal" },
      {
        name: "description",
        content:
          "Turn any archived expedition, dataset, publication or photograph into ready-to-publish social posts, press notes and newsletter copy.",
      },
      { property: "og:title", content: "Outreach Studio" },
      {
        property: "og:description",
        content:
          "Automated outreach and media copy generated from the polar science archive.",
      },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(expeditionsQuery),
      context.queryClient.ensureQueryData(repositoryQuery),
      context.queryClient.ensureQueryData(mediaQuery),
      context.queryClient.ensureQueryData(activitiesQuery),
    ]);
  },
  component: OutreachStudio,
});

type SourceOption = {
  key: string;
  group: string;
  title: string;
  details: string;
};

function OutreachStudio() {
  const { source } = Route.useSearch();
  const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
  const { data: repository } = useSuspenseQuery(repositoryQuery);
  const { data: media } = useSuspenseQuery(mediaQuery);
  const { data: activities } = useSuspenseQuery(activitiesQuery);

  const sources = useMemo<SourceOption[]>(
    () => [
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
          `Highlights: ${e.highlights.join("; ")}`,
        ].join("\n"),
      })),
      ...repository.map((r) => ({
        key: `repository:${r.id}`,
        group:
          r.item_type === "dataset"
            ? "Dataset"
            : r.item_type === "report"
              ? "Report"
              : "Publication",
        title: r.title,
        details: [
          `Type: ${r.item_type}`,
          `Year: ${r.year}`,
          `Theme: ${r.theme}`,
          `Authors: ${r.authors}`,
          `Reference: ${r.reference}`,
          `Abstract: ${r.abstract}`,
        ].join("\n"),
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
          m.captured_on ? `Captured: ${formatDateRange(m.captured_on)}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
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
          `Description: ${a.description}`,
        ].join("\n"),
      })),
    ],
    [expeditions, repository, media, activities],
  );

  const initialKey = source ? `expedition:${source}` : (sources[0]?.key ?? "");
  const [selectedKey, setSelectedKey] = useState(initialKey);
  const [audience, setAudience] = useState(AUDIENCES[0]!);
  const [tone, setTone] = useState(TONES[0]!);
  const [result, setResult] = useState<OutreachResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const selected = sources.find((s) => s.key === selectedKey) ?? sources[0];
  const generate = useServerFn(generateOutreach);

  async function handleGenerate() {
    if (!selected) return;
    setLoading(true);
    setResult(null);
    try {
      const output = await generate({
        data: {
          sourceType: selected.group,
          sourceTitle: selected.title,
          sourceDetails: selected.details,
          audience,
          tone,
        },
      });
      setResult(output);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "The outreach text could not be generated.",
      );
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
      newsletter: result.newsletter,
    });
    setSaving(false);
    if (error) toast.error("The draft could not be saved.");
    else toast.success("Draft saved to the portal.");
  }

  function copy(text: string) {
    void navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard.");
  }

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Automated media generator"
        title="Outreach Studio"
        intro="Pick anything in the archive, choose who it is for, and get social posts, a press note and newsletter copy written from the real record."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          <div>
            <p className="label-caps text-muted-foreground">
              1 · Choose an archive item
            </p>
            <select
              value={selectedKey}
              onChange={(event) => setSelectedKey(event.target.value)}
              className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
            >
              {sources.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.group}: {option.title}
                </option>
              ))}
            </select>
            {selected && (
              <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-card p-4 font-sans text-xs text-muted-foreground">
                {selected.details}
              </pre>
            )}
          </div>

          <Choice
            label="2 · Audience"
            value={audience}
            onChange={setAudience}
            options={AUDIENCES}
          />
          <Choice
            label="3 · Tone"
            value={tone}
            onChange={setTone}
            options={TONES}
          />

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {loading
              ? "Writing…"
              : result
                ? "Regenerate"
                : "Generate outreach content"}
          </button>
        </div>

        <div className="space-y-6">
          {!result && !loading && (
            <div className="rounded-sm border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              Your generated social posts, press note and newsletter paragraph
              will appear here.
            </div>
          )}
          {loading && (
            <div className="rounded-sm border border-border bg-card p-12 text-center text-sm text-muted-foreground">
              Writing outreach copy from the archive record. This usually takes
              under a minute.
            </div>
          )}
          {result && (
            <>
              <Output title="Social posts" body={result.social} onCopy={copy} />
              <Output title="Press note" body={result.press} onCopy={copy} />
              <Output
                title="Newsletter paragraph"
                body={result.newsletter}
                onCopy={copy}
              />
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-sm hover:border-accent hover:text-accent disabled:opacity-60"
              >
                <Save className="size-4" />{" "}
                {saving ? "Saving…" : "Save this draft"}
              </button>
            </>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function Output({
  title,
  body,
  onCopy,
}: {
  title: string;
  body: string;
  onCopy: (text: string) => void;
}) {
  if (!body) return null;
  return (
    <article className="rounded-sm border border-border bg-card">
      <header className="flex items-center justify-between border-b border-border px-5 py-3">
        <h2 className="font-display text-sm font-semibold">{title}</h2>
        <button
          type="button"
          onClick={() => onCopy(body)}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-accent"
        >
          <Copy className="size-3.5" /> Copy
        </button>
      </header>
      <p className="whitespace-pre-wrap px-5 py-4 text-sm leading-relaxed">
        {body}
      </p>
    </article>
  );
}

function Choice({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <p className="label-caps text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-sm transition-colors",
              value === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
