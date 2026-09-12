import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowRight, Users } from "lucide-react";

import { PageHeader, SiteShell } from "@/components/site-shell";
import { expeditionsQuery, formatDateRange, REGIONS } from "@/lib/archive";
import { imageFor } from "@/lib/images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/expeditions/")({
  head: () => ({
    meta: [
      { title: "Expedition Explorer — Polar Science Portal" },
      {
        name: "description",
        content:
          "Filter and explore polar expeditions by region, year, platform and research theme, with full records of teams, routes, data and media.",
      },
      { property: "og:title", content: "Expedition Explorer" },
      {
        property: "og:description",
        content:
          "Browse Antarctic, Arctic, Southern Ocean and Himalayan science expeditions.",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(expeditionsQuery),
  component: ExpeditionExplorer,
});

function ExpeditionExplorer() {
  const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
  const [region, setRegion] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [theme, setTheme] = useState<string>("All");

  const years = useMemo(
    () =>
      Array.from(new Set(expeditions.map((e) => e.year))).sort((a, b) => b - a),
    [expeditions],
  );
  const themes = useMemo(
    () => Array.from(new Set(expeditions.flatMap((e) => e.themes))).sort(),
    [expeditions],
  );

  const filtered = expeditions.filter(
    (e) =>
      (region === "All" || e.region === region) &&
      (year === "All" || String(e.year) === year) &&
      (theme === "All" || e.themes.includes(theme)),
  );

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Interactive explorer"
        title="Expedition Explorer"
        intro="Every recorded campaign, filterable by region, season and research theme. Open any expedition for its team, route, datasets, reports and field media."
      />

      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-8 px-5 py-6">
          <FilterGroup
            label="Region"
            value={region}
            onChange={setRegion}
            options={["All", ...REGIONS]}
          />
          <FilterGroup
            label="Season"
            value={year}
            onChange={setYear}
            options={["All", ...years.map(String)]}
          />
          <FilterGroup
            label="Theme"
            value={theme}
            onChange={setTheme}
            options={["All", ...themes]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="label-caps text-muted-foreground">
          {filtered.length} expedition{filtered.length === 1 ? "" : "s"}
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {REGIONS.map((r) => {
            const count = filtered.filter((e) => e.region === r).length;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(region === r ? "All" : r)}
                className={cn(
                  "rounded-sm border p-5 text-left transition-colors",
                  region === r
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/60",
                )}
              >
                <p className="label-caps text-muted-foreground">{r}</p>
                <p className="mt-2 font-display text-3xl font-semibold">
                  {count}
                </p>
                <p className="text-xs text-muted-foreground">in current view</p>
              </button>
            );
          })}
        </div>

        <ol className="mt-12 space-y-px border-l-2 border-border">
          {filtered.map((exp) => (
            <li key={exp.id} className="relative">
              <span className="absolute -left-[7px] top-9 size-3 rounded-full bg-accent" />
              <Link
                to="/expeditions/$slug"
                params={{ slug: exp.slug }}
                className="group grid gap-6 bg-card p-6 pl-8 transition-colors hover:bg-ice/30 md:grid-cols-[200px_1fr_auto] md:items-center"
              >
                <img
                  src={imageFor(exp.image_key)}
                  alt={exp.name}
                  loading="lazy"
                  width={1600}
                  height={1008}
                  className="h-32 w-full rounded-sm object-cover md:h-24"
                />
                <div>
                  <p className="label-caps text-accent">
                    {exp.code} · {exp.region}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">{exp.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDateRange(exp.start_date, exp.end_date)} ·{" "}
                    {exp.platform}
                  </p>
                  <p className="mt-3 max-w-2xl line-clamp-2 text-sm">
                    {exp.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.themes.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground md:flex-col md:items-end">
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-4" /> {exp.team_size}
                  </span>
                  <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {filtered.length === 0 && (
          <p className="mt-12 text-sm text-muted-foreground">
            No expeditions match these filters. Try widening your selection.
          </p>
        )}
      </section>
    </SiteShell>
  );
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
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
