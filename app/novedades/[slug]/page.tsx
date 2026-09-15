import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SITE_SETTINGS_QUERY,
  NOVEDAD_BY_SLUG_QUERY,
  NOVEDAD_SLUGS_QUERY,
  type SiteSettings,
  type NovedadDetail,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav/nav";
import Footer from "@/components/Footer/footer";
import PortableTextBody from "@/components/ui/portableTextBody";

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(NOVEDAD_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const novedad = await sanityFetch<NovedadDetail | null>(NOVEDAD_BY_SLUG_QUERY, { slug });
  if (!novedad) return {};
  return {
    title: `${novedad.title} | Novedades`,
    description: novedad.description,
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-UY", { day: "numeric", month: "long", year: "numeric" });

export default async function NovedadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [siteSettings, novedad] = await Promise.all([
    sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    sanityFetch<NovedadDetail | null>(NOVEDAD_BY_SLUG_QUERY, { slug }),
  ]);

  if (!novedad) notFound();

  const [firstImage, ...restImages] = novedad.images;

  return (
    <>
      <Nav siteSettings={siteSettings} />

      <main className="max-w-[800px] mx-auto px-6 py-14">
        <Link
          href="/novedades"
          className="inline-block no-underline text-sm text-accent-700 hover:text-accent-800 transition-colors mb-8"
        >
          ← Volver a novedades
        </Link>

        <p className="text-sm text-neutral-600 mb-2">{formatDate(novedad.publishedAt)}</p>
        <h1 className="text-3xl md:text-[2.5rem] leading-tight text-balance mb-4">
          {novedad.title}
        </h1>
        <p className="text-lg text-neutral-700 leading-relaxed mb-8">{novedad.description}</p>

        {/* Sin object-cover ni aspect-ratio fijo: en las cards recortar está
            bien (miniatura), pero acá tiene que verse la imagen completa —
            cada <Image> usa las dimensiones reales del asset para mantener
            su proporción natural en vez de forzarla a una caja. */}
        <div className="mb-10">
          <Image
            src={urlFor(firstImage).width(1200).url()}
            alt={firstImage.alt}
            width={firstImage.dimensions.width}
            height={firstImage.dimensions.height}
            priority
            sizes="(min-width: 768px) 800px, 100vw"
            className="w-full h-auto rounded-2xl mb-4"
          />

          {restImages.length > 0 && (
            <div
              className={cn(
                "grid gap-4",
                restImages.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
              )}
            >
              {restImages.map((image, index) => (
                <Image
                  key={index}
                  src={urlFor(image).width(800).url()}
                  alt={image.alt}
                  width={image.dimensions.width}
                  height={image.dimensions.height}
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="w-full h-auto rounded-xl"
                />
              ))}
            </div>
          )}
        </div>

        {novedad.body && novedad.body.length > 0 && <PortableTextBody value={novedad.body} />}
      </main>

      {siteSettings && <Footer siteSettings={siteSettings} />}
    </>
  );
}
