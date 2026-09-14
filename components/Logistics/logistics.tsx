import SectionHeading from "@/components/ui/sectionHeading";
import SectionNote from "@/components/ui/sectionNote";
import PlaceholderCard from "@/components/ui/placeholderCard";
import type { Dict } from "@/app/i18n/dictionaries";

const Logistics = ({ dict }: { dict: Dict }) => (
  <section id="logistica" className="max-w-[1100px] mx-auto px-6 py-14">
    <SectionHeading title={dict.logistics.title} />
    <SectionNote>{dict.logistics.sourceNote}</SectionNote>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {dict.logistics.items.map((item) => (
        <PlaceholderCard
          key={item.title}
          title={item.title}
          description={item.description}
          badgeLabel={item.pending ? dict.logistics.pendingBadge : undefined}
        />
      ))}
    </div>

    <div className="text-center">
      <a
        href="#contacto"
        className="inline-block no-underline text-[15px] bg-accent-700 text-bg px-[30px] py-3.5 rounded-full hover:bg-accent-800 transition-colors"
      >
        {dict.logistics.cta}
      </a>
    </div>
  </section>
);

export default Logistics;
