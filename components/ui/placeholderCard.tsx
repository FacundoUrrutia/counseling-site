import { cn } from "@/lib/utils";

interface PlaceholderCardProps {
  title: string;
  description: string;
  /** When set, the card renders with a dashed border and this label in a
   *  small monospace badge — the visual marker (from the Organic mockup)
   *  for content that's a stand-in and needs real input before publishing. */
  badgeLabel?: string;
}

/** One card in the Especialidades / Cómo trabajo / Honorarios grids.
 *  Solid surface + no badge for confirmed copy; dashed border + badge for
 *  anything still waiting on real data from Ignacia. */
const PlaceholderCard = ({ title, description, badgeLabel }: PlaceholderCardProps) => (
  <div
    className={cn(
      "bg-surface rounded-xl p-7",
      badgeLabel ? "border-[1.5px] border-dashed border-neutral-400" : "",
    )}
  >
    {badgeLabel && (
      <div className="text-[10px] font-mono tracking-wide text-accent-700 mb-2.5">
        {badgeLabel}
      </div>
    )}
    <h3 className="text-lg mb-2.5">{title}</h3>
    <p
      className={cn(
        "text-sm leading-relaxed",
        badgeLabel ? "text-neutral-700" : "text-neutral-800",
      )}
    >
      {description}
    </p>
  </div>
);

export default PlaceholderCard;
