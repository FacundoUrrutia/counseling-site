import SectionHeading from "@/components/ui/sectionHeading";
import PlaceholderCard from "@/components/ui/placeholderCard";
import type { Dict } from "@/app/i18n/dictionaries";

const Approach = ({ dict }: { dict: Dict }) => (
  <section id="enfoque" className="max-w-[1100px] mx-auto px-6 py-14">
    <SectionHeading title={dict.approach.title} />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {dict.approach.items.map((item) => (
        <PlaceholderCard
          key={item.title}
          title={item.title}
          description={item.description}
          badgeLabel={item.pending ? dict.approach.pendingBadge : undefined}
        />
      ))}
    </div>
  </section>
);

export default Approach;
