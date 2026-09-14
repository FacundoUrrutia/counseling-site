/**
 * Carga en Sanity el contenido real que hoy vive en este script — el mismo
 * texto que estaba hardcodeado en los componentes antes de esta migración.
 * Corré esto UNA vez contra un proyecto de Sanity recién creado para
 * arrancar con contenido real en vez de un Studio vacío.
 *
 * Requiere SANITY_API_WRITE_TOKEN con permiso de escritura (Editor o
 * superior) — ver README.md → "Conectar un proyecto real".
 *
 *   npm run seed
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import path from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Faltan variables de entorno. Necesito NEXT_PUBLIC_SANITY_PROJECT_ID, " +
      "NEXT_PUBLIC_SANITY_DATASET y SANITY_API_WRITE_TOKEN en .env.local.\n" +
      "Ver README.md → \"Conectar un proyecto real\".",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

async function uploadImage(filename: string, alt: string) {
  const asset = await client.assets.upload(
    "image",
    createReadStream(path.join(IMAGES_DIR, filename)),
    { filename },
  );
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
    alt,
  };
}

async function seed() {
  console.log("Subiendo imágenes...");
  const portrait = await uploadImage("ina320x400.jpeg", "Retrato de Ignacia Ayala");
  const officePhoto = await uploadImage(
    "consultorio.jpeg",
    "El consultorio de Ignacia Ayala en Montevideo",
  );

  console.log("Creando documentos...");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: "Ignacia Ayala",
    metaTitle: "Ignacia Ayala | Counseling & Acompañamiento",
    metaDescription:
      "Un espacio para escuchar, reflexionar y crecer. Acompañamiento profesional en tu proceso de cambio.",
    primaryCtaLabel: "Reservar una consulta",
    whatsappNavLabel: "WhatsApp",
    whatsappFullLabel: "Escribime por WhatsApp",
    whatsappNumber: "59899076756",
    whatsappMessage: "Hola Ignacia, te escribo desde tu sitio web.",
    footerCopyrightName: "Ignacia Ayala — Counselor profesional",
    footerCredentialLabel: "Perfil verificado en Psychology Today",
    footerCredentialUrl:
      "https://www.psychologytoday.com/uy/psicologos/ignacia-ayala-montevideo-mo/1681181",
  });

  await client.createOrReplace({
    _id: "hero",
    _type: "hero",
    titleBefore: "Te acompaño a atravesar",
    titleAfter: "con escucha profesional.",
    subtitle:
      "Un espacio de escucha y acompañamiento profesional, para encontrar claridad y herramientas en el momento en que las necesites.",
  });

  await client.createOrReplace({
    _id: "aboutMe",
    _type: "aboutMe",
    title: "Soy Ignacia Ayala, Counselor profesional",
    subtitle: "Te acompaño a encontrar claridad y bienestar en los momentos que lo necesites.",
    text: "Mi objetivo es brindarte un espacio de contención y escucha, donde puedas explorar tus emociones y encontrar nuevas perspectivas.",
    photo: portrait,
    credentialsFormationLabel: "Formación",
    credentialsFormationValue:
      "Certificado del Ministerio de Educación (CABA). Formación adicional en Counseling Gerontológico (Orientándome, 2025) y Neurocoaching (Holos, 2024). 2 años de experiencia profesional.",
    credentialsRegistrationLabel: "Matrícula / colegio profesional",
    credentialsRegistrationValue:
      "Por el momento no cuenta con matrícula ni con membresía en un colegio profesional.",
    credentialsSourceNote:
      'Fuente: perfil profesional verificado (Psychology Today / Psicología Hoy). Ahí se presenta como "Consultora Psicológica" desde el Enfoque Centrado en la Persona; este sitio usa "Counselor" como término de marca.',
  });

  await client.createOrReplace({
    _id: "specialtiesSection",
    _type: "specialtiesSection",
    title: "Especialidades",
    sourceNote: "Según su perfil profesional verificado (Psychology Today / Psicología Hoy).",
  });

  const specialties = [
    {
      slug: "espiritualidad",
      title: "Espiritualidad",
      description:
        "Un espacio para explorar la dimensión espiritual del bienestar, integrada al proceso terapéutico.",
      order: 1,
    },
    {
      slug: "duelo",
      title: "Duelo",
      description: "Acompañamiento en procesos de pérdida y duelo.",
      order: 2,
    },
    {
      slug: "terapia-de-pareja",
      title: "Terapia de pareja",
      description: "Trabajo con parejas sobre vínculos, comunicación y conflictos.",
      order: 3,
    },
    {
      slug: "ansiedad",
      title: "Ansiedad",
      description: "Herramientas para manejar la ansiedad en el día a día.",
      order: 4,
    },
  ];

  for (const s of specialties) {
    await client.createOrReplace({
      _id: `specialty-${s.slug}`,
      _type: "specialty",
      title: s.title,
      description: s.description,
      order: s.order,
    });
  }

  await client.createOrReplace({
    _id: "approach",
    _type: "approach",
    title: "Cómo trabajo",
    officePhoto,
    modalityTitle: "Modalidad",
    modalityText:
      "Sesiones presenciales en el consultorio (Bulevar José Batlle y Ordóñez 1624, Apto 603, Montevideo) u online por videollamada, de lunes a sábados.",
    sessionDurationTitle: "Duración de sesión",
    sessionDurationText: null, // pendiente — ver README
    firstConsultTitle: "La primera consulta",
    firstConsultText:
      "Podés agendar una consulta introductoria gratuita de 15 minutos para conversar sobre lo que te trae a terapia y cómo trabajo, antes de decidir si querés continuar.",
  });

  await client.createOrReplace({
    _id: "logistics",
    _type: "logistics",
    title: "Honorarios y logística",
    sourceNote:
      "Honorarios y modalidad de pago según su perfil profesional verificado — confirmar vigencia con Ignacia.",
    feesTitle: "Honorarios",
    feesText:
      "Sesión individual: $1500 (pesos uruguayos). Terapia de pareja: $1700. Precios variables según ingresos — consultalo directamente. Pago en efectivo, tarjeta o transferencia, el día de la sesión.",
    insuranceTitle: "Obra social / prepaga",
    insuranceText: "No trabaja con obra social ni prepaga — el pago es particular.",
    cancellationTitle: "Política de cancelación",
    cancellationText: null, // pendiente — ver README
  });

  await client.createOrReplace({
    _id: "confidentiality",
    _type: "confidentiality",
    text: "Todo lo que se comparte en sesión está protegido por el secreto profesional, con las excepciones legales que correspondan ante riesgo de vida.",
  });

  console.log("✓ Listo. Contenido cargado en el dataset:", dataset);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
