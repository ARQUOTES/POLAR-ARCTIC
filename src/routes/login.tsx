import { createFileRoute } from "@tanstack/react-router";
import { LockKeyhole, Snowflake } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  return (
    <SiteShell>
      <section className="grid min-h-[calc(100vh-16rem)] place-items-center bg-ice/30 px-5 py-16">
        <div className="w-full max-w-md border border-border bg-card p-7 shadow-sm sm:p-9">
          <div className="flex size-12 items-center justify-center rounded-sm bg-deep text-accent">
            <Snowflake className="size-6" />
          </div>
          <p className="mt-7 label-caps text-accent">Portal access</p>
          <h1 className="mt-2 text-3xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sign in to manage archive records and outreach drafts.
          </p>
          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block text-sm font-medium">
              Email address
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.org"
                className="mt-2 w-full border border-input bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-2 w-full border border-input bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <LockKeyhole className="size-4" />
              Sign in
            </button>
          </form>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Authentication will be connected to your portal account service.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
