import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** `urlFor(image).width(680).height(850).url()` — the standard
 *  @sanity/image-url builder, wired to this project's client. */
export const urlFor = (source: SanityImageSource) => builder.image(source);
