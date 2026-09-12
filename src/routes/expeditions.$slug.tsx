import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Users } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import {
  expeditionsQuery,
  formatDateRange,
  mediaQuery,
  repositoryQuery,
} from "@/lib/archive";
import { imageFor } from "@/lib/images";

export const Route = createFileRoute("/expeditions/$slug")({
  loader: async ({ context, params }) => {
    const [expeditions] = await Promise.all([
      context.queryClient.ensureQueryData(expeditionsQuery),
      context.queryClient.ensureQueryData(repositoryQuery),
      context.queryClient.ensureQueryData(mediaQuery),
    ]);
    const expedition = expeditions.find((e) => e.slug === params.slug);
    if (!expedition) throw notFound();
    return { name: expedition.name, summary: expedition.summary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Expedition unavailable" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.name} — Polar Science Portal` },
        { name: "description", content: loaderData.summary.slice(0, 155) },
        { property: "og:title", content: loaderData.name },
        {
          property: "og:description",
          content: loaderData.summary.slice(0, 155),
        },
      ],
    };
  },
  component: ExpeditionDetail,
});

function ExpeditionDetail() {
  const { slug } = Route.useParams();
  const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
  const { data: repository } = useSuspenseQuery(repositoryQuery);
  const { data: media } = useSuspenseQuery(mediaQuery);

  const expedition = expeditions.find((e) => e.slug === slug);
  if (!expedition) return null;

  const records = repository.filter((r) => r.expedition_slug === slug);
  const gallery = media.filter((m) => m.expedition_slug === slug);

  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden bg-deep text-deep-foreground">
        <img
          src={imageFor(expedition.image_key)}
          alt={expedition.name}
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-20">
          <Link
            to="/expeditions"
            className="label-caps text-accent hover:underline"
          >
            ← Expedition explorer
          </Link>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl">
            {expedition.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-deep-foreground/80">
            {expedition.summary}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-accent" />
              {formatDateRange(expedition.start_date, expedition.end_date)}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" />
              {expedition.region} · {expedition.platform}
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-accent" />
              {expedition.team_size} members · led by {expedition.leader}
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">Season highlights</h2>
          <ul className="mt-5 space-y-3 border-l-2 border-accent pl-5">
            {expedition.highlights.map((h) => (
              <li key={h} className="text-sm">
                {h}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-semibold">Route and stations</h2>
          <ol className="mt-5 space-y-px border-l-2 border-border">
            {expedition.route_stops.map((stop) => (
              <li key={stop.name} className="relative bg-card p-4 pl-7">
                <span className="absolute -left-[7px] top-6 size-3 rounded-full bg-primary" />
                <p className="font-medium">{stop.name}</p>
                <p className="text-sm text-muted-foreground">{stop.note}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside>
          <h2 className="text-2xl font-semibold">Research themes</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {expedition.themes.map((t) => (
              <span
                key={t}
                className="rounded-sm bg-ice px-3 py-1.5 text-sm text-ice-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            to="/outreach"
            search={{ source: expedition.slug }}
            className="mt-8 inline-flex rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            Create outreach content from this expedition
          </Link>
        </aside>
      </section>

      <section className="border-y border-border bg-ice/30">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-2xl font-semibold">
            Reports, datasets and publications
          </h2>
          <div className="mt-8 grid gap-px bg-border md:grid-cols-2">
            {records.map((item) => (
              <article key={item.id} className="bg-card p-6">
                <p className="label-caps text-accent">
                  {item.item_type} · {item.file_format} · {item.file_size}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.authors} · {item.reference}
                </p>
                <p className="mt-3 text-sm">{item.abstract}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-2xl font-semibold">Field media</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <figure
              key={item.id}
              className="overflow-hidden rounded-sm border border-border"
            >
              <img
                src={imageFor(item.image_key)}
                alt={item.title}
                loading="lazy"
                width={1600}
                height={1008}
                className="h-52 w-full object-cover"
              />
              <figcaption className="bg-card p-4">
                <p className="label-caps text-accent">
                  {item.kind === "video"
                    ? `Film · ${item.duration}`
                    : "Photograph"}
                </p>
                <p className="mt-2 font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
