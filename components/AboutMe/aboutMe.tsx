import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { AboutMe as AboutMeContent, SiteSettings } from "@/sanity/lib/queries";

interface AboutMeProps {
  aboutMe: AboutMeContent;
  siteSettings: SiteSettings;
}

const AboutMe = ({ aboutMe, siteSettings }: AboutMeProps) => (
  <section
    id="sobre-mi"
    className="max-w-[1000px] mx-auto px-6 py-14 flex flex-wrap gap-12 items-start"
  >
    <div className="flex-1 basis-[260px] max-w-[340px]">
      <Image
        src={urlFor(aboutMe.photo).width(680).height(850).url()}
        alt={aboutMe.photo.alt}
        width={340}
        height={425}
        priority
        sizes="(min-width: 768px) 340px, 60vw"
        className="w-full aspect-[4/5] object-cover rounded-[28px] shadow-lg washed"
      />
    </div>

    <div className="flex-[2] basis-[380px] min-w-0">
      <h2 className="text-2xl md:text-[28px] mb-1.5">{aboutMe.title}</h2>
      <p className="italic text-neutral-700 mb-4">{aboutMe.subtitle}</p>
      <p className="text-neutral-800 mb-6">{aboutMe.text}</p>

      {/* Campos de texto libre, no un booleano "pendiente" — hoy reflejan
          hechos confirmados (no tener matrícula es un dato real). */}
      <div className="flex flex-col gap-2.5 bg-surface rounded-2xl p-5 mb-5">
        <div className="text-sm text-neutral-800">
          {aboutMe.credentialsFormationLabel}:{" "}
          <span className="text-neutral-700">{aboutMe.credentialsFormationValue}</span>
        </div>
        <div className="text-sm text-neutral-800">
          {aboutMe.credentialsRegistrationLabel}:{" "}
          <span className="text-neutral-700">{aboutMe.credentialsRegistrationValue}</span>
        </div>
        {aboutMe.credentialsSourceNote && (
          <p className="text-xs text-neutral-700 mt-1">{aboutMe.credentialsSourceNote}</p>
        )}
      </div>

      <a
        href="#contacto"
        className="no-underline text-sm text-accent-700 hover:text-accent-800 transition-colors"
      >
        {siteSettings.primaryCtaLabel} →
      </a>
    </div>
  </section>
);

export default AboutMe;
