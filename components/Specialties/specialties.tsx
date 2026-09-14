import SectionHeading from "@/components/ui/sectionHeading";
import SectionNote from "@/components/ui/sectionNote";
import PlaceholderCard from "@/components/ui/placeholderCard";
import type { SpecialtiesSection, Specialty } from "@/sanity/lib/queries";

interface SpecialtiesProps {
  section: SpecialtiesSection;
  items: Specialty[];
}

const Specialties = ({ section, items }: SpecialtiesProps) => {
  if (items.length === 0) return null;

  return (
    <section id="especialidades" className="max-w-[1100px] mx-auto px-6 py-14">
      <SectionHeading title={section.title} />
      {section.sourceNote && <SectionNote>{section.sourceNote}</SectionNote>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <PlaceholderCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>
    </section>
  );
};

export default Specialties;
