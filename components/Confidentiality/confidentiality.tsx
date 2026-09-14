import type { Confidentiality as ConfidentialityContent } from "@/sanity/lib/queries";

// Línea Vida — prevención del suicidio, Uruguay. Dato institucional fijo,
// no contenido de Ignacia: se deja hardcodeado a propósito (ver
// sanity/schemaTypes/confidentiality.ts) para que no pueda editarse ni
// vaciarse por accidente desde el Studio.
const EMERGENCY_LEAD = "Este formulario no es un canal de emergencia.";
const EMERGENCY_INTRO =
  "Si estás en una crisis o en riesgo, comunicate con la Línea Vida de prevención del suicidio (Uruguay):";
const EMERGENCY_PHONE_1 = "0800 0767";
const EMERGENCY_PHONE_1_LABEL = "desde teléfono fijo";
const EMERGENCY_PHONE_2 = "*0767";
const EMERGENCY_PHONE_2_LABEL = "desde celular";
const EMERGENCY_CLOSING = "gratuita, las 24 horas, todos los días del año.";

const Confidentiality = ({ confidentiality }: { confidentiality: ConfidentialityContent }) => (
  <section className="max-w-[800px] mx-auto px-6 py-10">
    <p className="text-sm text-neutral-800 text-center">{confidentiality.text}</p>

    <div className="bg-accent-2-100 rounded-2xl px-7 py-6 mt-5">
      <p className="text-sm text-accent-2-900 m-0">
        <strong>{EMERGENCY_LEAD}</strong> {EMERGENCY_INTRO}{" "}
        <strong>{EMERGENCY_PHONE_1}</strong> {EMERGENCY_PHONE_1_LABEL} o{" "}
        <strong>{EMERGENCY_PHONE_2}</strong> {EMERGENCY_PHONE_2_LABEL} — {EMERGENCY_CLOSING}
      </p>
    </div>
  </section>
);

export default Confidentiality;
