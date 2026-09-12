import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Users } from "lucide-react";

import { PageHeader, SiteShell } from "@/components/site-shell";
import { activitiesQuery, formatDateRange, type Activity } from "@/lib/archive";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Institutional Activities — Polar Science Portal" },
      {
        name: "description",
        content:
          "Symposia, workshops, school outreach programmes, exhibitions and institutional meetings from the polar science community.",
      },
      { property: "og:title", content: "Institutional Activities" },
      {
        property: "og:description",
        content:
          "Upcoming and past polar science outreach programmes, workshops and exhibitions.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(activitiesQuery),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const { data: activities } = useSuspenseQuery(activitiesQuery);
  const today = new Date("2026-09-12");
  const upcoming = activities
    .filter((a) => new Date(a.ends_on ?? a.starts_on) >= today)
    .sort((a, b) => a.starts_on.localeCompare(b.starts_on));
  const past = activities
    .filter((a) => new Date(a.ends_on ?? a.starts_on) < today)
    .sort((a, b) => b.starts_on.localeCompare(a.starts_on));

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Outreach and institutional life"
        title="Activities, programmes and events"
        intro="Public outreach programmes, scientific symposia, training workshops and institutional meetings across the polar research calendar."
      />

      <section className="mx-auto max-w-7xl px-5 py-14">
        <h2 className="text-2xl font-semibold">Upcoming</h2>
        <div className="mt-8 grid gap-px bg-border md:grid-cols-2">
          {upcoming.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
        {upcoming.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            No scheduled activities right now.
          </p>
        )}

        <h2 className="mt-16 text-2xl font-semibold">Past activities</h2>
        <div className="mt-8 grid gap-px bg-border md:grid-cols-2">
          {past.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <article className="bg-card p-6">
      <p className="label-caps text-accent">{activity.activity_type}</p>
      <h3 className="mt-3 text-lg font-semibold">{activity.title}</h3>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="size-4" />
          {formatDateRange(activity.starts_on, activity.ends_on)}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin className="size-4" />
          {activity.location}
        </span>
        <span className="inline-flex items-center gap-2">
          <Users className="size-4" />
          {activity.audience}
        </span>
      </div>
      <p className="mt-4 text-sm">{activity.description}</p>
    </article>
  );
}
