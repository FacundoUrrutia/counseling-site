import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // El Studio queda embebido en /studio dentro del propio Next.js —
  // `npx sanity deploy` (deploy hosteado aparte en sanity.studio) no es
  // necesario para este proyecto, pero el comando sigue disponible por si
  // en algún momento conviene separar el Studio del deploy del sitio.
});
