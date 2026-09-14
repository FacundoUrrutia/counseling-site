# Sitio de Ignacia Ayala — Counseling

Next.js 16 (App Router) + Tailwind v4 + Sanity como CMS. Sitio de una sola
página, en español.

## Arrancar en local

```bash
npm install
npm run dev
```

Abre en `http://localhost:3000`. El Studio de contenido vive embebido en
`http://localhost:3000/studio` (mismo servidor, mismo deploy — no hay que
levantar nada aparte).

Sin un proyecto de Sanity conectado (ver abajo), el sitio compila pero
las páginas que dependen de contenido van a fallar al hacer fetch — es
esperado, no un bug.

## Costo

El plan **Free** de Sanity alcanza de sobra para este sitio: 1 dataset
(el límite es 2), ~11 documentos (el límite es 10.000), y las 2 fotos
actuales pesan una fracción mínima de los 100 GB de storage incluidos.
El tráfico de API tampoco es un problema — con ISR revalidando cada 60
segundos, el sitio no golpea la API de Sanity por cada visita.

El único límite real del plan Free: solo existen los roles
Administrator y Viewer — no hay un rol "Editor" acotado a contenido sin
acceso a configuración, eso es de pago (Growth, $15/seat/mes). Ver
"Cómo edita Ignacia" más abajo para el detalle.

## Conectar un proyecto real

Este repo trae todo el código listo (Studio, schemas, cliente, queries,
componentes conectados), pero **no un proyecto de Sanity real** — crear
uno requiere loguearte con tu cuenta, algo que no se puede automatizar
desde acá. Son 4 pasos:

### 1. Crear el proyecto

```bash
npx sanity login
npx sanity init --env
```

`init --env` te va a preguntar si querés crear un proyecto nuevo o usar
uno existente, y te escribe automáticamente `NEXT_PUBLIC_SANITY_PROJECT_ID`
y `NEXT_PUBLIC_SANITY_DATASET` en `.env.local`. Si preferís hacerlo a
mano, copiá `.env.local.example` a `.env.local` y completá esos dos
valores vos mismo (los encontrás en [sanity.io/manage](https://sanity.io/manage)
→ tu proyecto → Settings → API).

### 2. Generar un token de escritura (solo para el seed)

En [sanity.io/manage](https://sanity.io/manage) → tu proyecto → API →
Tokens → **Add API token**, con permiso **Editor**. Pegalo en
`.env.local` como `SANITY_API_WRITE_TOKEN`. No lo necesitás para que el
sitio funcione en modo lectura — solo para correr el script de carga
inicial del punto 3, y para que Ignacia edite desde el Studio (ahí el
login es el de su cuenta de Sanity, no este token).

### 3. Cargar el contenido inicial

```bash
npm run seed
```

Sube las dos imágenes (`public/images/*.jpeg`) como assets de Sanity y
crea todos los documentos con el contenido real que hoy tiene el sitio
(bio, especialidades, honorarios, etc. — ver `scripts/seed.ts` para el
texto exacto). Es seguro correrlo más de una vez: usa `createOrReplace`
con IDs fijos, así que sobreescribe en vez de duplicar.

### 4. Verificar

```bash
npm run dev
```

`/` debería mostrar el sitio con el contenido cargado, y `/studio` el
Studio con todos los documentos ya poblados.

## Cómo edita Ignacia

1. Entra a `https://<tu-dominio>/studio` (o al deploy de Vercel donde
   esté publicado) y se loguea con su cuenta de Sanity — Google,
   GitHub o email/contraseña, lo que hayas usado para invitarla.
2. La invitás desde [sanity.io/manage](https://sanity.io/manage) → tu
   proyecto → Members → **Invite members**, con rol **Administrator**.

   Ojo: en el plan **Free** de Sanity solo hay dos roles — Administrator
   (lectura/escritura completa + acceso a configuración del proyecto) y
   Viewer (solo lectura, no puede editar nada). El rol **Editor** — el
   que restringe a "puede publicar contenido pero no toca settings" —
   es una función paga, recién disponible desde el plan Growth
   ($15/seat/mes). Para que Ignacia pueda editar de verdad en Free, la
   única opción es invitarla como Administrator: va a poder ver la
   pestaña de Settings (tokens, miembros, billing) además del
   contenido, aunque en la práctica no tiene motivo para tocarla. Si en
   algún momento preferís que quede estrictamente limitada a contenido,
   ahí sí conviene pasar a Growth y darle Editor.
3. En el panel izquierdo del Studio ve las secciones del sitio
   (Configuración del sitio, Hero, Sobre mí, Especialidades, Cómo
   trabajo, Honorarios y logística, Confidencialidad) más la lista de
   Especialidades para agregar/quitar/reordenar. Cada cambio que
   publica (botón **Publish**) se refleja en el sitio en vivo dentro
   de **1 minuto** — no hace falta redeploy (ver "Cómo se sirve el
   contenido" abajo).

## Qué entra a Sanity y qué no

**Sí** (contenido real, lo edita Ignacia): bio, foto, credenciales,
especialidades, cómo trabaja, honorarios, confidencialidad, número de
WhatsApp, textos de los botones de contacto, footer, meta título/descripción.

**No** (queda hardcodeado en el código):

- **Labels de navegación** (Sobre mí, Especialidades, etc.) — están
  acoplados a los `#anchor` de cada sección; editarlos desde el Studio
  sin tocar el código rompería el scroll.
- **Microcopy del formulario de contacto** (labels, botones, mensajes
  de error) — texto de UI, no contenido editorial.
- **Número de la Línea Vida** (prevención del suicidio, Uruguay —
  `0800 0767` / `*0767`) — es un dato institucional fijo, no de
  Ignacia; se deja en el código a propósito para que no se pueda editar
  ni vaciar por accidente desde el Studio.

Si en algún momento alguno de estos SÍ debería ser editable, avisame —
es un cambio chico (agregar el campo al schema correspondiente).

## El formulario de contacto

Sigue siendo **Formspree** (`components/ContactForm/contactForm.tsx`),
no un Route Handler propio de Next — no se tocó en esta migración, y no
pasa por Sanity para nada. El ID de formulario vive en
`NEXT_PUBLIC_FORMSPREE_ID`.

## Cómo se sirve el contenido (ISR, no SSG puro)

`sanity/lib/fetch.ts` pide a Next.js revalidar cada fetch a Sanity como
máximo una vez por minuto (`next: { revalidate: 60 }`), en vez de
generar la página una sola vez en el build. Así un cambio publicado en
el Studio aparece en producción sin necesidad de rebuildear ni
redeployar — el peor caso es esperar hasta 60 segundos.

## Schema — decisiones de diseño

- **Singletons con ID fijo** (`siteSettings`, `hero`, `aboutMe`,
  `specialtiesSection`, `approach`, `logistics`, `confidentiality`): la
  estructura del Studio (`sanity/structure.ts`) los muestra como panel
  único de edición, sin opción de "crear nuevo" — no hay riesgo de que
  alguien cree un segundo "Hero" por accidente.
- **`specialty` es el único tipo repetible de verdad** — las otras
  secciones (Cómo trabajo, Honorarios) tienen 3 cards fijas con un
  layout específico (una de ellas emparejada con una foto), así que se
  modelaron como campos nombrados en vez de un array abierto que un
  editor podría alargar sin que el diseño lo acompañe.
- **Sin i18n** — el sitio es 100% español; no hay campos duplicados
  por idioma ni el plugin `document-internationalization`.
- **Campos de texto en vez de un booleano "pendiente"**: cuando algo
  todavía no tiene dato real (duración de sesión, política de
  cancelación), el campo simplemente queda vacío en Sanity y el
  componente muestra el badge "PENDIENTE" automáticamente — no hace
  falta que Ignacia toque un booleano aparte además de escribir el
  texto.
