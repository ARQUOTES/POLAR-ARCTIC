import { createFileRoute } from "@tanstack/react-router";
import { Code2, Globe2, Users } from "lucide-react";

import { PageHeader, SiteShell } from "@/components/site-shell";

const developers = [
  {
    name: "Ankurak Roy",
    role: "Project Lead",
    initials: "AR",
    focus: "Product strategy and polar research partnerships.",
  },
  {
    name: "Kinjal Pramanik",
    role: "Team Member",
    initials: "KP",
    focus: "Accessible interfaces and visual systems.",
  },
  {
    name: "Souvick Saha",
    role: "Team Member",
    initials: "SS",
    focus: "Archive services, APIs and secure data flows.",
  },
  {
    name: "Aryan Chowdhury",
    role: "Team Member",
    initials: "AC",
    focus: "Scientific datasets and metadata reliability.",
  },
  {
    name: "Sampad Chakraborty",
    role: "Team Member",
    initials: "SC",
    focus: "Researcher and public outreach experiences.",
  },
  {
    name: "Sneha Sarkar",
    role: "Team Member",
    initials: "SS",
    focus: "Testing, performance and release quality.",
  },
] as const;

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Polar Science Portal" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="The people behind the portal"
        title="Built for discoveries that matter."
        intro="We bring polar science, open knowledge and thoughtful technology together so research can travel farther."
      />
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 border-b border-border pb-14 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="label-caps text-accent">Our mission</p>
            <h2 className="mt-3 text-3xl font-semibold">
              Make polar knowledge easier to find, understand and share.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            The Polar Science Portal unites expedition records, scientific data
            and outreach resources in a dependable public archive. Our
            multidisciplinary team designs every part of the experience for
            clarity, accessibility and lasting value.
          </p>
        </div>
        <div className="mt-14 flex items-center gap-3">
          <Users className="size-5 text-accent" />
          <div>
            <p className="label-caps text-accent">Development team</p>
            <h2 className="mt-1 text-2xl font-semibold">
              Six people, one shared mission
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((developer) => (
            <article
              key={developer.name}
              className="group border border-border bg-card p-6 transition-colors hover:border-accent/70 hover:bg-ice/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-12 items-center justify-center rounded-sm bg-deep font-display text-sm font-semibold text-accent">
                  {developer.initials}
                </div>
                <Code2 className="size-5 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <p className="mt-7 label-caps text-accent">{developer.role}</p>
              <h3 className="mt-2 text-xl font-semibold">{developer.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {developer.focus}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-deep text-deep-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-5 px-5 py-12">
          <Globe2 className="size-8 text-accent" />
          <p className="max-w-2xl text-lg text-deep-foreground/80">
            Designed in collaboration with the people who collect, interpret and
            communicate polar science.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
