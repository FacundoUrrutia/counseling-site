import type { Metadata } from "next";
import { Caprasimo, Figtree } from "next/font/google";
import "./globals.css";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, type SiteSettings } from "@/sanity/lib/queries";

const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  weight: "400",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  return {
    title: siteSettings?.metaTitle ?? "Ignacia Ayala | Counseling & Acompañamiento",
    description:
      siteSettings?.metaDescription ??
      "Un espacio para escuchar, reflexionar y crecer. Acompañamiento profesional en tu proceso de cambio.",
    manifest: "/site.webmanifest",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${caprasimo.variable} ${figtree.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
