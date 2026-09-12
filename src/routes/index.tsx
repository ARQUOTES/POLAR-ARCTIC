import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Database, FileText, Film, Compass } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import {
  activitiesQuery,
  expeditionsQuery,
  formatDateRange,
  mediaQuery,
  repositoryQuery,
} from "@/lib/archive";
import { imageFor } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Polar Science Portal — Expeditions, Data & Outreach Archive" },
      {
        name: "description",
        content:
          "Archive of polar expedition reports, scientific datasets, publications, photos and videos, with an interactive expedition explorer and outreach content studio.",
      },
      { property: "og:title", content: "Polar Science Portal" },
      {
        property: "og:description",
        content:
          "Explore polar expeditions, open datasets, publications and media from Antarctic, Arctic, Southern Ocean and Himalayan science campaigns.",
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
  component: HomePage,
});

function HomePage() {
  const { data: expeditions } = useSuspenseQuery(expeditionsQuery);
  const { data: repository } = useSuspenseQuery(repositoryQuery);
  const { data: media } = useSuspenseQuery(mediaQuery);
  const { data: activities } = useSuspenseQuery(activitiesQuery);

  const featured = expeditions[0];
  const publications = repository
    .filter((item) => item.item_type === "publication")
    .slice(0, 4);
  const latestMedia = media.slice(0, 6);
  const upcoming = activities
    .filter((a) => new Date(a.starts_on) >= new Date("2025-11-01"))
    .slice(0, 3);

  const stats = [
    { icon: Compass, value: expeditions.length, label: "Expeditions archived" },
    {
      icon: Database,
      value: repository.filter((r) => r.item_type === "dataset").length,
      label: "Open datasets",
    },
    {
      icon: FileText,
      value: repository.filter((r) => r.item_type !== "dataset").length,
      label: "Reports & publications",
    },
    { icon: Film, value: media.length, label: "Photos & films" },
  ];

  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden bg-deep text-deep-foreground">
        <img
          src={imageFor(featured?.image_key)}
          alt="Polar ice landscape from a recent expedition"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-28">
          <p className="label-caps text-accent">
            Integrated polar knowledge portal
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Every expedition, dataset and story from the poles — in one place.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-deep-foreground/80">
            Expedition records, open scientific data, peer-reviewed
            publications, field photography and institutional activities,
            published together with tools that turn research into public
            outreach.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/expeditions"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Open the expedition explorer <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/outreach"
              className="inline-flex items-center gap-2 rounded-sm border border-deep-foreground/30 px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Generate outreach content
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-8">
              <stat.icon className="size-5 text-accent" />
              <p className="mt-4 font-display text-4xl font-semibold">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-7xl px-5 py-16">
          <p className="label-caps text-accent">Featured expedition</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold">{featured.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {featured.code} · {featured.region} ·{" "}
                {formatDateRange(featured.start_date, featured.end_date)}
              </p>
              <p className="mt-5 text-base leading-relaxed">
                {featured.summary}
              </p>
              <ul className="mt-6 space-y-2 border-l-2 border-accent pl-5 text-sm">
                {featured.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <Link
                to="/expeditions/$slug"
                params={{ slug: featured.slug }}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent"
              >
                View full expedition record <ArrowRight className="size-4" />
              </Link>
            </div>
            <img
              src={imageFor(featured.image_key)}
              alt={featured.name}
              loading="lazy"
              width={1600}
              height={1008}
              className="h-full w-full rounded-sm object-cover"
            />
          </div>
        </section>
      )}

      <section className="border-y border-border bg-ice/30">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold">Latest publications</h2>
            <Link
              to="/repository"
              className="text-sm font-medium text-primary hover:text-accent"
            >
              Browse the full repository
            </Link>
          </div>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2">
            {publications.map((item) => (
              <article key={item.id} className="bg-card p-6">
                <p className="label-caps text-muted-foreground">
                  {item.theme} · {item.year}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.authors}
                </p>
                <p className="mt-3 line-clamp-3 text-sm">{item.abstract}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">From the field</h2>
          <Link
            to="/media"
            className="text-sm font-medium text-primary hover:text-accent"
          >
            Open the media gallery
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestMedia.map((item) => (
            <figure
              key={item.id}
              className="group overflow-hidden rounded-sm border border-border"
            >
              <img
                src={imageFor(item.image_key)}
                alt={item.title}
                loading="lazy"
                width={1600}
                height={1008}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="bg-card p-4">
                <p className="label-caps text-accent">
                  {item.kind === "video"
                    ? `Film · ${item.duration}`
                    : "Photograph"}
                </p>
                <p className="mt-2 font-medium">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold">Coming up</h2>
            <Link
              to="/activities"
              className="text-sm font-medium text-primary hover:text-accent"
            >
              All institutional activities
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {upcoming.map((activity) => (
              <article
                key={activity.id}
                className="border-l-2 border-accent pl-5"
              >
                <p className="label-caps text-muted-foreground">
                  {activity.activity_type}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{activity.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDateRange(activity.starts_on, activity.ends_on)} ·{" "}
                  {activity.location}
                </p>
                <p className="mt-3 text-sm">{activity.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
