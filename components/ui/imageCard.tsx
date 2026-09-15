import Image from "next/image";

interface ImageCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

/** Same card shell as PlaceholderCard, with a photo on top — used where a
 *  real image supports the copy (currently just the office photo on the
 *  Modalidad card). A one-off variant rather than adding image support to
 *  PlaceholderCard itself, since every other card on the site is text-only. */
const ImageCard = ({ title, description, imageSrc, imageAlt }: ImageCardProps) => (
  <div className="bg-surface rounded-xl overflow-hidden flex flex-col">
    <div className="relative aspect-[4/3]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 360px, 100vw"
        className="object-cover washed"
      />
    </div>
    <div className="p-7">
      <h3 className="text-lg mb-2.5">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-800">{description}</p>
    </div>
  </div>
);

export default ImageCard;
