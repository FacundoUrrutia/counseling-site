import type { Dict } from "@/app/i18n/dictionaries";

const Confidentiality = ({ dict }: { dict: Dict }) => (
  <section className="max-w-[800px] mx-auto px-6 py-10">
    <p className="text-sm text-neutral-800 text-center">{dict.confidentiality.text}</p>

    <div className="bg-accent-2-100 rounded-2xl px-7 py-6 mt-5">
      <p className="text-sm text-accent-2-900 m-0">
        <strong>{dict.confidentiality.emergencyLead}</strong>{" "}
        {dict.confidentiality.emergencyIntro}{" "}
        <strong>{dict.confidentiality.emergencyPhone1}</strong>{" "}
        {dict.confidentiality.emergencyPhone1Label}{" "}
        {dict.confidentiality.emergencyConnector}{" "}
        <strong>{dict.confidentiality.emergencyPhone2}</strong>{" "}
        {dict.confidentiality.emergencyPhone2Label} — {dict.confidentiality.emergencyClosing}
      </p>
    </div>
  </section>
);

export default Confidentiality;
