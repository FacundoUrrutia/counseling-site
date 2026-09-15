import "server-only";
import { client } from "./client";

/**
 * Thin wrapper around client.fetch() that forces ISR instead of the SSG
 * default: Next.js caches the result but re-fetches at most once every
 * REVALIDATE_SECONDS, so an edit made in the Studio shows up on the site
 * within a minute — no rebuild/redeploy needed.
 */
const REVALIDATE_SECONDS = 60;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
}
