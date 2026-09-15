import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_PAGE_QUERY, type HomePageData } from "@/sanity/lib/queries";
import Nav from "@/components/Nav/nav";
import Hero from "@/components/Hero/hero";
import AboutMe from "@/components/AboutMe/aboutMe";
import Specialties from "@/components/Specialties/specialties";
import Approach from "@/components/Approach/approach";
import Logistics from "@/components/Logistics/logistics";
import Novedades from "@/components/Novedades/novedades";
import Confidentiality from "@/components/Confidentiality/confidentiality";
import ContactForm from "@/components/ContactForm/contactForm";
import Footer from "@/components/Footer/footer";

export default async function Home() {
  const data = await sanityFetch<HomePageData>(HOME_PAGE_QUERY);

  // Cada sección chequea sus propios datos requeridos y no se renderiza si
  // el documento singleton todavía no existe en Sanity (Studio recién
  // inicializado, antes de correr el seed) — ver el comentario en cada
  // componente. Evita una página rota a media carga en vez de fallar clarito.
  return (
    <>
      <Nav siteSettings={data.siteSettings} />
      {data.hero && data.siteSettings && (
        <Hero hero={data.hero} siteSettings={data.siteSettings} specialties={data.specialties} />
      )}
      {data.aboutMe && data.siteSettings && (
        <AboutMe aboutMe={data.aboutMe} siteSettings={data.siteSettings} />
      )}
      {data.specialtiesSection && <Specialties section={data.specialtiesSection} items={data.specialties} />}
      {data.approach && <Approach approach={data.approach} />}
      {data.logistics && data.siteSettings && (
        <Logistics logistics={data.logistics} siteSettings={data.siteSettings} />
      )}
      {data.novedadesSection && (
        <Novedades section={data.novedadesSection} items={data.latestNovedades} />
      )}
      {data.confidentiality && <Confidentiality confidentiality={data.confidentiality} />}
      {data.siteSettings && <ContactForm siteSettings={data.siteSettings} />}
      {data.siteSettings && <Footer siteSettings={data.siteSettings} />}
    </>
  );
}
