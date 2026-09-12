import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type RouteStop = { name: string; note: string };

export type Expedition = {
  id: string;
  slug: string;
  name: string;
  code: string;
  region: string;
  year: number;
  start_date: string;
  end_date: string;
  platform: string;
  themes: string[];
  summary: string;
  leader: string;
  team_size: number;
  highlights: string[];
  route_stops: RouteStop[];
  image_key: string | null;
};

export type RepositoryItem = {
  id: string;
  title: string;
  item_type: "report" | "dataset" | "publication";
  year: number;
  theme: string;
  authors: string;
  abstract: string;
  reference: string;
  file_format: string;
  file_size: string;
  expedition_slug: string | null;
};

export type MediaItem = {
  id: string;
  title: string;
  kind: "photo" | "video";
  caption: string;
  credit: string;
  theme: string;
  captured_on: string | null;
  duration: string | null;
  image_key: string | null;
  expedition_slug: string | null;
};

export type Activity = {
  id: string;
  title: string;
  activity_type: string;
  starts_on: string;
  ends_on: string | null;
  location: string;
  audience: string;
  description: string;
};

function unwrap<T>(result: {
  data: unknown;
  error: { message: string } | null;
}): T {
  if (result.error) throw new Error(result.error.message);
  return (result.data ?? []) as T;
}

async function queryOrEmpty<T>(
  request: PromiseLike<{ data: unknown; error: { message: string } | null }>,
): Promise<T[]> {
  try {
    return unwrap<T[]>(await request);
  } catch (error) {
    console.error("Archive data could not be loaded:", error);
    return [];
  }
}

export const expeditionsQuery = queryOptions({
  queryKey: ["expeditions"],
  queryFn: async () =>
    queryOrEmpty<Expedition>(
      await supabase
        .from("expeditions")
        .select("*")
        .order("start_date", { ascending: false }),
    ),
});

export const repositoryQuery = queryOptions({
  queryKey: ["repository"],
  queryFn: async () =>
    queryOrEmpty<RepositoryItem>(
      await supabase
        .from("repository_items")
        .select("*")
        .order("year", { ascending: false })
        .order("title"),
    ),
});

export const mediaQuery = queryOptions({
  queryKey: ["media"],
  queryFn: async () =>
    queryOrEmpty<MediaItem>(
      await supabase
        .from("media_items")
        .select("*")
        .order("captured_on", { ascending: false }),
    ),
});

export const activitiesQuery = queryOptions({
  queryKey: ["activities"],
  queryFn: async () =>
    queryOrEmpty<Activity>(
      await supabase
        .from("activities")
        .select("*")
        .order("starts_on", { ascending: false }),
    ),
});

export function formatDateRange(start: string, end?: string | null): string {
  const fmt = (value: string) =>
    new Date(value + "T00:00:00Z").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  if (!end || end === start) return fmt(start);
  return `${fmt(start)} — ${fmt(end)}`;
}

export const REGIONS = [
  "Arctic",
  "Antarctic",
  "Southern Ocean",
  "Himalaya",
] as const;
