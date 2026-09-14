import SectionHeading from "@/components/ui/sectionHeading";
import SectionNote from "@/components/ui/sectionNote";
import PlaceholderCard from "@/components/ui/placeholderCard";
import type { Dict } from "@/app/i18n/dictionaries";

const Specialties = ({ dict }: { dict: Dict }) => (
  <section id="especialidades" className="max-w-[1100px] mx-auto px-6 py-14">
    <SectionHeading title={dict.specialties.title} />
    <SectionNote>{dict.specialties.placeholderNote}</SectionNote>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {dict.specialties.items.map((item) => (
        <PlaceholderCard
          key={item.title}
          title={item.title}
          description={item.description}
          badgeLabel={dict.specialties.exampleBadge}
        />
      ))}
    </div>
  </section>
);

export default Specialties;
