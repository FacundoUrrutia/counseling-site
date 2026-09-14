import SectionHeading from "@/components/ui/sectionHeading";
import SectionNote from "@/components/ui/sectionNote";
import PlaceholderCard from "@/components/ui/placeholderCard";
import type { Logistics as LogisticsContent, SiteSettings } from "@/sanity/lib/queries";

const PENDING_BADGE = "PENDIENTE";

interface LogisticsProps {
  logistics: LogisticsContent;
  siteSettings: SiteSettings;
}

const Logistics = ({ logistics, siteSettings }: LogisticsProps) => (
  <section id="logistica" className="max-w-[1100px] mx-auto px-6 py-14">
    <SectionHeading title={logistics.title} />
    {logistics.sourceNote && <SectionNote>{logistics.sourceNote}</SectionNote>}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      <PlaceholderCard title={logistics.feesTitle} description={logistics.feesText} />
      <PlaceholderCard title={logistics.insuranceTitle} description={logistics.insuranceText} />
      <PlaceholderCard
        title={logistics.cancellationTitle}
        description={logistics.cancellationText ?? "[completar, ej. horas de anticipación]"}
        badgeLabel={logistics.cancellationText ? undefined : PENDING_BADGE}
      />
    </div>

    <div className="text-center">
      <a
        href="#contacto"
        className="inline-block no-underline text-[15px] bg-accent-700 text-bg px-[30px] py-3.5 rounded-full hover:bg-accent-800 transition-colors"
      >
        {siteSettings.primaryCtaLabel}
      </a>
    </div>
  </section>
);

export default Logistics;
