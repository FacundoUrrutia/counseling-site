"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Ignacia Ayala — Counseling",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    // Vision: playground de GROQ dentro del Studio — útil para depurar
    // queries sin salir del navegador. No aparece para roles con menos
    // permisos que Editor.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
});
