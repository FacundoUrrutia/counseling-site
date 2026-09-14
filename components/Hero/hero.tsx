import { whatsappUrl } from "@/lib/site";
import type { Dict } from "@/app/i18n/dictionaries";

const Hero = ({ dict }: { dict: Dict }) => (
  <header
    id="hero"
    className="max-w-[900px] mx-auto px-6 pt-16 pb-14 text-center fade-in"
  >
    <h1 className="text-[clamp(32px,5vw,50px)] leading-[1.15] text-balance mb-2">
      {dict.hero.titleBefore}{" "}
      {/* Real specialties from her verified profile — a solid tag pill
          (matching the design system's .tag-accent) rather than the mockup's
          dashed "placeholder" border, now that this is confirmed content. */}
      <span className="inline-block bg-accent-100 text-accent-800 rounded-full px-3 py-0.5 mx-0.5 font-mono text-[0.5em] align-[2px]">
        {dict.hero.specialtiesExample}
      </span>{" "}
      {dict.hero.titleAfter}
    </h1>

    <p className="text-lg text-neutral-800 max-w-[560px] mx-auto mb-8 mt-6 text-balance">
      {dict.hero.subtitle}
    </p>

    <div className="flex gap-3.5 justify-center flex-wrap">
      <a
        href="#contacto"
        className="no-underline text-[15px] bg-accent-700 text-bg px-[30px] py-3.5 rounded-full hover:bg-accent-800 transition-colors"
      >
        {dict.hero.ctaPrimary}
      </a>
      <a
        href={whatsappUrl(dict.contactForm.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline text-[15px] border border-ink/[0.16] text-ink px-[30px] py-3.5 rounded-full hover:bg-ink/[0.07] transition-colors"
      >
        {dict.hero.ctaSecondary}
      </a>
    </div>
  </header>
);

export default Hero;
