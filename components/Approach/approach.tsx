import SectionHeading from "@/components/ui/sectionHeading";
import PlaceholderCard from "@/components/ui/placeholderCard";
import ImageCard from "@/components/ui/imageCard";
import type { Dict } from "@/app/i18n/dictionaries";

const Approach = ({ dict }: { dict: Dict }) => (
  <section id="enfoque" className="max-w-[1100px] mx-auto px-6 py-14">
    <SectionHeading title={dict.approach.title} />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {dict.approach.items.map((item, index) =>
        /* First item (Modalidad) pairs with a real photo of the office —
           everything else stays a plain text card. */
        index === 0 ? (
          <ImageCard
            key={item.title}
            title={item.title}
            description={item.description}
            imageSrc="/images/consultorio.jpeg"
            imageAlt={dict.approach.officeImageAlt}
          />
        ) : (
          <PlaceholderCard
            key={item.title}
            title={item.title}
            description={item.description}
            badgeLabel={item.pending ? dict.approach.pendingBadge : undefined}
          />
        ),
      )}
    </div>
  </section>
);

export default Approach;
