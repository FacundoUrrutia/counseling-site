import Link from "next/link";
import SectionHeading from "@/components/ui/sectionHeading";
import NovedadCard from "./novedadCard";
import type { NovedadesSection, NovedadCard as NovedadCardData } from "@/sanity/lib/queries";

interface NovedadesProps {
  section: NovedadesSection;
  items: NovedadCardData[];
}

const Novedades = ({ section, items }: NovedadesProps) => {
  if (items.length === 0) return null;

  return (
    <section id="novedades" className="max-w-[1100px] mx-auto px-6 py-14">
      <SectionHeading title={section.title} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {items.map((item) => (
          <NovedadCard key={item.slug} item={item} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/novedades"
          className="inline-block no-underline text-sm text-accent-700 hover:text-accent-800 transition-colors"
        >
          Ver todas las novedades →
        </Link>
      </div>
    </section>
  );
};

export default Novedades;
