import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // No borradores/preview aquí — el sitio no tiene modo preview implementado.
  // Con esto en true, next-sanity sirve contenido cacheado por la CDN de
  // Sanity, que es lo que querés combinado con `revalidate` de Next.
  useCdn: true,
});
