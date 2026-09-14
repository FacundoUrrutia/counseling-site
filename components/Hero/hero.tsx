import type { Dict } from "@/app/i18n/dictionaries";

const Hero = ({ dict }: { dict: Dict }) => (
  <header
    id="hero"
    className="max-w-[900px] mx-auto px-6 pt-16 pb-14 text-center fade-in"
  >
    <h1 className="text-[clamp(32px,5vw,50px)] leading-[1.15] text-balance mb-2">
      {dict.hero.titleBefore}{" "}
      <span className="inline-block border-[1.5px] border-dashed border-neutral-400 rounded-xl px-3 py-0.5 mx-0.5 font-mono text-[0.5em] align-[2px] text-accent-700">
        {dict.hero.specialtiesExample}
      </span>{" "}
      {dict.hero.titleAfter}
    </h1>

    <p className="text-[11px] font-mono text-neutral-700 mb-6">
      {dict.hero.placeholderNote}
    </p>

    <p className="text-lg text-neutral-800 max-w-[560px] mx-auto mb-8 text-balance">
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
        href="#contacto"
        className="no-underline text-[15px] border border-ink/[0.16] text-ink px-[30px] py-3.5 rounded-full hover:bg-ink/[0.07] transition-colors"
      >
        {dict.hero.ctaSecondary}
      </a>
    </div>
  </header>
);

export default Hero;
