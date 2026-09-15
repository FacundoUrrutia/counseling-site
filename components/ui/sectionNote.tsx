/** The small centered monospace note used under a section heading to flag
 *  that its content is a placeholder awaiting real data from Ignacia. */
const SectionNote = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-mono text-neutral-700 mb-8 max-w-2xl mx-auto text-balance">
    {children}
  </p>
);

export default SectionNote;
