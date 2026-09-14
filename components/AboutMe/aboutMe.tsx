import Image from "next/image";
import type { Dict } from "@/app/i18n/dictionaries";

const AboutMe = ({ dict }: { dict: Dict }) => (
  <section
    id="sobre-mi"
    className="max-w-[1000px] mx-auto px-6 py-14 flex flex-wrap gap-12 items-start"
  >
    <div className="flex-1 basis-[260px] max-w-[340px]">
      <Image
        src="/images/ina320x400.jpeg"
        alt={dict.aboutMe.photoAlt}
        width={320}
        height={400}
        priority
        sizes="(min-width: 768px) 340px, 60vw"
        className="w-full aspect-[4/5] object-cover rounded-[28px] shadow-lg washed"
      />
    </div>

    <div className="flex-[2] basis-[380px] min-w-0">
      <h2 className="text-2xl md:text-[28px] mb-1.5">{dict.aboutMe.title}</h2>
      <p className="italic text-neutral-700 mb-4">{dict.aboutMe.subtitle}</p>
      <p className="text-neutral-800 mb-6">{dict.aboutMe.text}</p>

      <div className="flex flex-col gap-2.5 border-[1.5px] border-dashed border-neutral-400 rounded-2xl p-5 mb-5">
        <div className="text-[10px] tracking-wide font-mono text-accent-700">
          {dict.aboutMe.credentialsBoxLabel}
        </div>
        <div className="text-sm text-neutral-800">
          {dict.aboutMe.credentialsFormationLabel}:{" "}
          <span className="text-neutral-700">{dict.aboutMe.credentialsFormationValue}</span>
        </div>
        <div className="text-sm text-neutral-800">
          {dict.aboutMe.credentialsRegistrationLabel}:{" "}
          <span className="text-neutral-700">{dict.aboutMe.credentialsRegistrationValue}</span>
        </div>
        <div className="text-sm text-neutral-800">
          {dict.aboutMe.credentialsAssociationLabel}:{" "}
          <span className="text-neutral-700">{dict.aboutMe.credentialsAssociationValue}</span>
        </div>
        <p className="text-xs text-neutral-700 mt-1">
          {dict.aboutMe.credentialsSourceNote}
        </p>
      </div>

      <a
        href="#contacto"
        className="no-underline text-sm text-accent-700 hover:text-accent-800 transition-colors"
      >
        {dict.aboutMe.cta} →
      </a>
    </div>
  </section>
);

export default AboutMe;
