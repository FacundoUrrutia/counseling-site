import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { NOVEDAD_SLUGS_QUERY } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await sanityFetch<{ slug: string }[]>(NOVEDAD_SLUGS_QUERY);

  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    { url: `${SITE_URL}/novedades`, lastModified: new Date(), priority: 0.8 },
    ...slugs.map(({ slug }) => ({
      url: `${SITE_URL}/novedades/${slug}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
  ];
}
