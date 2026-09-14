/**
 * Studio embebido en /studio — mismo deploy que el sitio, sin hosting
 * separado. Ver README.md para cómo levantarlo en local y cómo accede
 * Ignacia una vez deployado.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
