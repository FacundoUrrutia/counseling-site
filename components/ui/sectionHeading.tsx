/** The divider — title — divider pattern shared by every content section
 *  (Especialidades, Cómo trabajo, Honorarios, Contacto) in the Organic
 *  design system's mockup. Built once instead of repeated markup per section. */
const SectionHeading = ({ title }: { title: string }) => (
  <div className="flex items-center gap-5 mb-8">
    <div className="flex-1 h-px bg-ink/[0.12]" />
    <h2 className="text-2xl md:text-3xl text-center text-balance">{title}</h2>
    <div className="flex-1 h-px bg-ink/[0.12]" />
  </div>
);

export default SectionHeading;
