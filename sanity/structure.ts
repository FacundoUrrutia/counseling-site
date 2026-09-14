import type { StructureResolver } from "sanity/structure";
import { SINGLETON_TYPES } from "./schemaTypes";

const SINGLETON_PANES: Array<{ id: string; title: string }> = [
  { id: "siteSettings", title: "Configuración del sitio" },
  { id: "hero", title: "Hero (inicio)" },
  { id: "aboutMe", title: "Sobre mí" },
  { id: "specialtiesSection", title: "Especialidades (sección)" },
  { id: "approach", title: "Cómo trabajo" },
  { id: "logistics", title: "Honorarios y logística" },
  { id: "confidentiality", title: "Confidencialidad" },
];

/**
 * Custom desk structure: each singleton gets a fixed-id document pane
 * (no "create new" / no duplicates possible), "Especialidades" gets the
 * normal orderable list view. Anything added to the schema later that
 * isn't in SINGLETON_TYPES falls through to the default list automatically.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      ...SINGLETON_PANES.map(({ id, title }) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem("specialty").title("Especialidades"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== undefined &&
          !SINGLETON_TYPES.has(item.getId() as string) &&
          item.getId() !== "specialty",
      ),
    ]);
