import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // El Studio no debería indexarse — no es contenido público del sitio.
      { userAgent: "*", disallow: "/studio" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
