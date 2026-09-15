import { whatsappUrl } from "@/lib/site";
import type { Hero as HeroContent, SiteSettings, Specialty } from "@/sanity/lib/queries";

interface HeroProps {
  hero: HeroContent;
  siteSettings: SiteSettings;
  specialties: Specialty[];
}

const Hero = ({ hero, siteSettings, specialties }: HeroProps) => {
  // El chip de especialidades del título se arma a partir de los
  // documentos `specialty` reales — no hay un texto separado que haya que
  // mantener sincronizado a mano con la grilla de Especialidades.
  const specialtiesTag = specialties.map((s) => s.title).join(" · ");

  return (
    <header
      id="hero"
      className="max-w-[900px] mx-auto px-6 pt-16 pb-14 text-center fade-in"
    >
      <h1 className="text-[clamp(32px,5vw,50px)] leading-[1.15] text-balance mb-2">
        {hero.titleBefore}
        {specialtiesTag && (
          <span className="block my-3 md:my-4 mx-auto w-fit bg-accent-100 text-accent-800 rounded-full px-3 py-0.5 font-mono text-[0.5em]">
            {specialtiesTag}
          </span>
        )}
        {hero.titleAfter}
      </h1>

      <p className="text-lg text-neutral-800 max-w-[560px] mx-auto mb-8 mt-6 text-balance">
        {hero.subtitle}
      </p>

      <div className="flex gap-3.5 justify-center flex-wrap">
        <a
          href="#contacto"
          className="no-underline text-[15px] bg-accent-700 text-bg px-[30px] py-3.5 rounded-full hover:bg-accent-800 transition-colors"
        >
          {siteSettings.primaryCtaLabel}
        </a>
        <a
          href={whatsappUrl(siteSettings.whatsappNumber, siteSettings.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-[15px] border border-ink/[0.16] text-ink px-[30px] py-3.5 rounded-full hover:bg-ink/[0.07] transition-colors"
        >
          {siteSettings.whatsappFullLabel}
        </a>
      </div>
    </header>
  );
};

export default Hero;
