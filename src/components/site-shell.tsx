import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LogIn, Snowflake } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/expeditions", label: "Expeditions" },
  { to: "/repository", label: "Repository" },
  { to: "/media", label: "Media" },
  { to: "/activities", label: "Activities" },
  { to: "/outreach", label: "Outreach Studio" },
  { to: "/about", label: "About" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-deep text-deep-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-sm bg-accent text-accent-foreground">
              <Snowflake className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-semibold tracking-tight">
                Polar Science Portal
              </span>
              <span className="label-caps block text-deep-foreground/60">
                Science · Archive · Outreach
              </span>
            </span>
          </Link>
          <nav className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="text-deep-foreground/70 transition-colors hover:text-accent"
                activeProps={{ className: "text-accent font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/login"
            className="ml-auto inline-flex items-center gap-2 rounded-sm border border-deep-foreground/35 px-3.5 py-2 text-sm font-medium text-deep-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            <LogIn className="size-4" />
            Login
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-deep text-deep-foreground/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-base font-semibold text-deep-foreground">
              Polar Science Portal
            </p>
            <p className="mt-2 max-w-xs text-sm">
              A single home for polar expedition records, open scientific data,
              publications and public outreach material.
            </p>
          </div>
          <div>
            <p className="label-caps text-deep-foreground/50">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.slice(1).map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-caps text-deep-foreground/50">
              Regions covered
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Antarctic stations</li>
              <li>Arctic — Ny-Ålesund</li>
              <li>Southern Ocean cruises</li>
              <li>Himalayan cryosphere</li>
            </ul>
          </div>
          <div>
            <p className="label-caps text-deep-foreground/50">Data use</p>
            <p className="mt-3 text-sm">
              Archive records are published for research and education. Cite the
              dataset or report reference shown on each entry.
            </p>
          </div>
        </div>
        <div className="border-t border-border/30 px-5 py-5 text-center text-xs">
          Polar Science Outreach &amp; Knowledge Repository
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-border bg-ice/40">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <p className="label-caps text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          {intro}
        </p>
      </div>
    </section>
  );
}
