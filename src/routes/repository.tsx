import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";

import { PageHeader, SiteShell } from "@/components/site-shell";
import { repositoryQuery } from "@/lib/archive";
import { cn } from "@/lib/utils";

const TYPES = ["All", "report", "dataset", "publication"] as const;

export const Route = createFileRoute("/repository")({
  head: () => ({
    meta: [
      { title: "Knowledge Repository — Polar Science Portal" },
      {
        name: "description",
        content:
          "Searchable archive of polar expedition reports, open scientific datasets and peer-reviewed publications, filterable by type, year and theme.",
      },
      { property: "og:title", content: "Knowledge Repository" },
      {
        property: "og:description",
        content:
          "Reports, datasets and publications from polar science campaigns.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(repositoryQuery),
  component: RepositoryPage,
});

function RepositoryPage() {
  const { data: items } = useSuspenseQuery(repositoryQuery);
  const [type, setType] = useState<string>("All");
  const [theme, setTheme] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [search, setSearch] = useState("");

  const themes = useMemo(
    () => Array.from(new Set(items.map((i) => i.theme))).sort(),
    [items],
  );
  const years = useMemo(
    () => Array.from(new Set(items.map((i) => i.year))).sort((a, b) => b - a),
    [items],
  );

  const term = search.trim().toLowerCase();
  const filtered = items.filter(
    (i) =>
      (type === "All" || i.item_type === type) &&
      (theme === "All" || i.theme === theme) &&
      (year === "All" || String(i.year) === year) &&
      (term === "" ||
        `${i.title} ${i.authors} ${i.abstract} ${i.reference}`
          .toLowerCase()
          .includes(term)),
  );

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Knowledge repository"
        title="Reports, datasets and publications"
        intro="One searchable archive across every campaign. Each entry carries its citation reference, format and originating expedition."
      />

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl space-y-5 px-5 py-6">
          <label className="flex items-center gap-3 rounded-sm border border-border px-4 py-2.5">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search titles, authors, abstracts and references"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="flex flex-wrap gap-8">
            <Chips
              label="Type"
              value={type}
              onChange={setType}
              options={TYPES}
            />
            <Chips
              label="Theme"
              value={theme}
              onChange={setTheme}
              options={["All", ...themes]}
            />
            <Chips
              label="Year"
              value={year}
              onChange={setYear}
              options={["All", ...years.map(String)]}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="label-caps text-muted-foreground">
          {filtered.length} records
        </p>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 py-6 md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="label-caps text-accent">
                  {item.item_type} · {item.theme} · {item.year}
                </p>
                <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.authors}
                </p>
                <p className="mt-3 max-w-3xl text-sm">{item.abstract}</p>
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                  {item.reference}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <span className="rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                  {item.file_format} · {item.file_size}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  <Download className="size-4" /> Request file
                </button>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            No records match this search.
          </p>
        )}
      </section>
    </SiteShell>
  );
}

function Chips({
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
              "rounded-sm border px-3 py-1.5 text-sm capitalize transition-colors",
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
