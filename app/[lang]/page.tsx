import { notFound } from "next/navigation";
import { getDictionary, isValidLocale } from "../i18n/dictionaries";
import Nav from "@/components/Nav/nav";
import Hero from "@/components/Hero/hero";
import AboutMe from "@/components/AboutMe/aboutMe";
import Specialties from "@/components/Specialties/specialties";
import Approach from "@/components/Approach/approach";
import Logistics from "@/components/Logistics/logistics";
import Confidentiality from "@/components/Confidentiality/confidentiality";
import ContactForm from "@/components/ContactForm/contactForm";
import Footer from "@/components/Footer/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <Hero dict={dict} />
      <AboutMe dict={dict} />
      <Specialties dict={dict} />
      <Approach dict={dict} />
      <Logistics dict={dict} />
      <Confidentiality dict={dict} />
      <ContactForm dict={dict} />
      <Footer dict={dict} />
    </>
  );
}
