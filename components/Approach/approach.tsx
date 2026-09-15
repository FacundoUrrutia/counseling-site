import SectionHeading from "@/components/ui/sectionHeading";
import PlaceholderCard from "@/components/ui/placeholderCard";
import ImageCard from "@/components/ui/imageCard";
import { urlFor } from "@/sanity/lib/image";
import type { Approach as ApproachContent } from "@/sanity/lib/queries";

// Fija en código, no en Sanity — es un label de estado de UI, no contenido
// de Ignacia (ver el mismo criterio en Logistics).
const PENDING_BADGE = "PENDIENTE";

const Approach = ({ approach }: { approach: ApproachContent }) => (
  <section id="enfoque" className="max-w-[1100px] mx-auto px-6 py-14">
    <SectionHeading title={approach.title} />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ImageCard
        title={approach.modalityTitle}
        description={approach.modalityText}
        imageSrc={urlFor(approach.officePhoto).width(720).height(540).url()}
        imageAlt={approach.officePhoto.alt}
      />
      <PlaceholderCard
        title={approach.sessionDurationTitle}
        description={approach.sessionDurationText ?? "[completar, ej. 45–50 minutos]"}
        badgeLabel={approach.sessionDurationText ? undefined : PENDING_BADGE}
      />
      <PlaceholderCard title={approach.firstConsultTitle} description={approach.firstConsultText} />
    </div>
  </section>
);

export default Approach;
