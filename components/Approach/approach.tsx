import SectionHeading from "@/components/ui/sectionHeading";
import PlaceholderCard from "@/components/ui/placeholderCard";
import ImageCard from "@/components/ui/imageCard";
import { urlFor } from "@/sanity/lib/image";
import type { Approach as ApproachContent, SanityImageWithAlt } from "@/sanity/lib/queries";

// Fija en código, no en Sanity — es un label de estado de UI, no contenido
// de Ignacia (ver el mismo criterio en Logistics).
const PENDING_BADGE = "PENDIENTE";

interface Card {
  title: string;
  description: string;
  image: SanityImageWithAlt | null;
  pending?: boolean;
}

const Approach = ({ approach }: { approach: ApproachContent }) => {
  // Cada una de las 3 cards tiene su propia imagen opcional — ninguna está
  // atada de antemano a una sola foto fija. Si la carga en Sanity, se
  // muestra como ImageCard; si no, como card de solo texto.
  const cards: Card[] = [
    { title: approach.modalityTitle, description: approach.modalityText, image: approach.modalityImage },
    {
      title: approach.sessionDurationTitle,
      description: approach.sessionDurationText ?? "[completar, ej. 45–50 minutos]",
      image: approach.sessionDurationImage,
      pending: !approach.sessionDurationText,
    },
    {
      title: approach.firstConsultTitle,
      description: approach.firstConsultText,
      image: approach.firstConsultImage,
    },
  ];

  return (
    <section id="enfoque" className="max-w-[1100px] mx-auto px-6 py-14">
      <SectionHeading title={approach.title} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) =>
          card.image ? (
            <ImageCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageSrc={urlFor(card.image).width(720).height(540).url()}
              imageAlt={card.image.alt}
            />
          ) : (
            <PlaceholderCard
              key={card.title}
              title={card.title}
              description={card.description}
              badgeLabel={card.pending ? PENDING_BADGE : undefined}
            />
          ),
        )}
      </div>
    </section>
  );
};

export default Approach;
