import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { NovedadCard as NovedadCardData } from "@/sanity/lib/queries";

/** One card — reused on the home section's 3 latest and on the full
 *  /novedades listing. Unlike the other cards on the site, this one is
 *  itself the link to the post's detail page. */
const NovedadCard = ({ item }: { item: NovedadCardData }) => (
  <Link
    href={`/novedades/${item.slug}`}
    className="group block bg-surface rounded-xl overflow-hidden no-underline text-ink h-full"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={urlFor(item.image).width(600).height(450).url()}
        alt={item.image.alt}
        fill
        sizes="(min-width: 1024px) 360px, 90vw"
        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
      />
    </div>
    <div className="p-6">
      <h3 className="text-lg mb-2 group-hover:text-accent-700 transition-colors">{item.title}</h3>
      <p className="text-sm text-neutral-800 leading-relaxed">{item.description}</p>
    </div>
  </Link>
);

export default NovedadCard;
