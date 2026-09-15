import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SITE_SETTINGS_QUERY,
  NOVEDADES_LIST_QUERY,
  type SiteSettings,
  type NovedadesListData,
} from "@/sanity/lib/queries";
import Nav from "@/components/Nav/nav";
import Footer from "@/components/Footer/footer";
import NovedadCard from "@/components/Novedades/novedadCard";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  return {
    title: `Novedades | ${siteSettings?.brandName ?? "Ignacia Ayala"}`,
    description: "Capacitaciones, reuniones y eventos.",
  };
}

export default async function NovedadesPage() {
  const [siteSettings, { section, items }] = await Promise.all([
    sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    sanityFetch<NovedadesListData>(NOVEDADES_LIST_QUERY),
  ]);

  return (
    <>
      <Nav siteSettings={siteSettings} />

      <main className="max-w-[1100px] mx-auto px-6 py-14">
        <h1 className="text-3xl md:text-4xl text-center mb-12">
          {section?.title ?? "Novedades"}
        </h1>

        {items.length === 0 ? (
          <p className="text-center text-neutral-700">Todavía no hay novedades publicadas.</p>
        ) : (
          // Mobile: slider de a 1 (scroll horizontal con snap). Desktop (lg+):
          // grid de 3 por fila. Sin librería de carrusel — scroll-snap nativo
          // alcanza y no suma peso al bundle.
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {items.map((item) => (
              <div key={item.slug} className="snap-center shrink-0 w-[85%] lg:w-auto lg:shrink">
                <NovedadCard item={item} />
              </div>
            ))}
          </div>
        )}
      </main>

      {siteSettings && <Footer siteSettings={siteSettings} />}
    </>
  );
}
