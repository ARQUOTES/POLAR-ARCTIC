import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Play, X } from "lucide-react";

import { PageHeader, SiteShell } from "@/components/site-shell";
import {
  expeditionsQuery,
  formatDateRange,
  mediaQuery,
  type MediaItem,
} from "@/lib/archive";
import { imageFor } from "@/lib/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media Gallery — Polar Science Portal" },
      {
        name: "description",
        content:
          "Expedition photography and films from Antarctic, Arctic, Southern Ocean and Himalayan field campaigns, filterable by expedition and theme.",
      },
      { property: "og:title", content: "Polar Media Gallery" },
      {
        property: "og:description",
        content:
          "Photographs and documentary films from polar science expeditions.",
      },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(mediaQuery),
      context.queryClient.ensureQueryData(expeditionsQuery),
    ]);
  },
  component: MediaPage,
});

function MediaPage() {
  const { data: media } = useSuspenseQuery(mediaQuery);
  const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
  const [kind, setKind] = useState("All");
  const [expedition, setExpedition] = useState("All");
  const [active, setActive] = useState<MediaItem | null>(null);

  const expeditionName = useMemo(() => {
    const map = new Map(expeditions.map((e) => [e.slug, e.name]));
    return (slug: string | null) => (slug ? (map.get(slug) ?? "") : "");
  }, [expeditions]);

  const filtered = media.filter(
    (m) =>
      (kind === "All" || m.kind === kind) &&
      (expedition === "All" || m.expedition_slug === expedition),
  );

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Media dissemination"
        title="Photographs and films from the field"
        intro="Cleared imagery and documentary films from every campaign, ready for classrooms, press use and public exhibitions with credit."
      />

      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-8 px-5 py-6">
          <div>
            <p className="label-caps text-muted-foreground">Format</p>
            <div className="mt-2 flex gap-2">
              {["All", "photo", "video"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setKind(option)}
                  className={cn(
                    "rounded-sm border px-3 py-1.5 text-sm capitalize transition-colors",
                    kind === option
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-64">
            <p className="label-caps text-muted-foreground">Expedition</p>
            <select
              value={expedition}
              onChange={(event) => setExpedition(event.target.value)}
              className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="All">All expeditions</option>
              {expeditions.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="label-caps text-muted-foreground">
          {filtered.length} items
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group overflow-hidden rounded-sm border border-border text-left"
            >
              <div className="relative">
                <img
                  src={imageFor(item.image_key)}
                  alt={item.title}
                  loading="lazy"
                  width={1600}
                  height={1008}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.kind === "video" && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-sm bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                    <Play className="size-3" /> {item.duration}
                  </span>
                )}
              </div>
              <div className="bg-card p-4">
                <p className="label-caps text-muted-foreground">{item.theme}</p>
                <p className="mt-2 font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {expeditionName(item.expedition_slug)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep/90 p-5"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-full w-full max-w-4xl overflow-auto rounded-sm bg-card"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={imageFor(active.image_key)}
              alt={active.title}
              width={1600}
              height={1008}
              className="max-h-[60vh] w-full object-cover"
            />
            <div className="flex items-start justify-between gap-6 p-6">
              <div>
                <p className="label-caps text-accent">
                  {active.kind === "video"
                    ? `Film · ${active.duration}`
                    : "Photograph"}{" "}
                  · {active.theme}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{active.title}</h2>
                <p className="mt-2 text-sm">{active.caption}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {active.credit}
                  {active.captured_on
                    ? ` · ${formatDateRange(active.captured_on)}`
                    : ""}
                  {active.expedition_slug
                    ? ` · ${expeditionName(active.expedition_slug)}`
                    : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="rounded-sm border border-border p-2 hover:border-accent"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
