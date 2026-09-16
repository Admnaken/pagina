# Administración NAKEN — Documentación de entrega

## 1. Qué se hizo y qué falta completar

Se reconstruyó el sitio completo (`index.html` + 6 páginas internas), en HTML5
semántico, CSS propio (sin frameworks) y JavaScript vanilla, siguiendo el
brief punto por punto. Se usó **solo** información que pude verificar de
forma directa en este proyecto: RPA 20066, nombre del administrador
(Lic. Sebastián R. Espeche), teléfono/WhatsApp, email, dominio y eslogan.

**Todo lo que no pude verificar quedó marcado como `[COMPLETAR DATO]`** en el
propio HTML, tal como pediste. Los puntos más importantes a resolver antes
de publicar:

| Dónde | Qué falta |
|---|---|
| `assets/images/naken-logo.png` | ✅ Ya es el logo real que compartiste (con el fondo crema removido para que se vea limpio en el header blanco). |
| `favicon.ico` | ✅ Generado a partir del logo real. |
| `assets/images/hero-administracion-consorcios-caba.webp` | ✅ Ya es la foto real del edificio que compartiste, sin texto incrustado — correcta para SEO (el H1 vive en HTML, no en la imagen). |
| `pages/legal.html` | La sección **Aviso Legal** ahora es el texto final que vos escribiste/revisaste, tal cual, en 13 secciones. La **Política de Privacidad** sigue con la base que armé citando la **Ley 25.326** y el **Decreto 1558/2021**, siguiendo la estructura que recomienda la AAIP (responsable, datos recopilados, finalidad, destinatarios, medidas de seguridad, plazo de conservación y derechos ARCO). Quedan marcados como `[COMPLETAR DATO]` solo los datos específicos que no pude verificar: razón social/CUIT y domicilio legal a los fines de la Ley 25.326, plazo exacto de conservación de datos, y si se usan cookies o proveedores externos a los que se les ceda información. **Recomiendo que un abogado revise también esta parte antes de publicar.** |
| FAQ, pregunta "¿Qué información necesita un administrador para tomar un consorcio?" | Marcada como `[COMPLETAR DATO]` porque no tenía el detalle exacto verificado. |
| Formulario de contacto | No tiene backend (como pediste que no inventara uno). Ver sección 5 para conectarlo. |

## 2. Estructura de archivos entregada

```
/
├── index.html
├── robots.txt
├── sitemap.xml
├── favicon.ico              (placeholder — reemplazar)
├── CNAME                     (igual al que ya usás en GitHub Pages)
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       ├── hero-administracion-consorcios-caba.webp
│       └── naken-logo.png    (placeholder — reemplazar)
└── pages/
    ├── servicios.html
    ├── nosotros.html
    ├── cambiar-administrador.html
    ├── preguntas-frecuentes.html
    ├── contacto.html
    └── legal.html
```

No se crearon las páginas de barrios (`/administracion-consorcios-palermo/`,
etc.) tal como pediste — la arquitectura ya está preparada para agregarlas
después (mismo sistema de header/footer y de estilos), pero no generé
contenido duplicado sin necesidad real.

## 3. Imágenes: lista y alt text recomendado

| Archivo | Uso | Alt text |
|---|---|---|
| `hero-administracion-consorcios-caba.webp` ✅ real | Fondo del hero (home) | "Edificio residencial moderno en la Ciudad de Buenos Aires" |
| `naken-logo.png` ✅ real | Logo en header/footer | "Administración NAKEN" |
| *(pendiente)* Foto para `/pages/nosotros.html` | Opcional, humaniza la página | Algo como "Lic. Sebastián R. Espeche, administrador de consorcios" (solo si hay foto real y autorizada) |

Los `alt` ya están escritos así en el código; no usan keyword stuffing.

## 4. Title y meta description por página

| Página | Title | Meta description |
|---|---|---|
| `/` | Administración de Consorcios en CABA \| Administración NAKEN | Administración de consorcios en CABA. Gestión profesional, transparente y cercana para edificios y propiedades horizontales. RPA 20066. |
| `/pages/servicios.html` | Servicios de Administración de Consorcios en CABA \| Administración NAKEN | Liquidación de expensas, gestión financiera, mantenimiento edilicio, gestión de proveedores y más. Servicios de administración de consorcios en CABA. |
| `/pages/nosotros.html` | Nosotros \| Administración NAKEN | Administración NAKEN: administración de consorcios en CABA a cargo del Lic. Sebastián R. Espeche, RPA 20066. |
| `/pages/cambiar-administrador.html` | Cambiar de Administrador de Consorcio en CABA \| Administración NAKEN | ¿Pensás cambiar el administrador de tu consorcio en CABA? Analizamos la situación actual y presentamos una propuesta de gestión ordenada. |
| `/pages/preguntas-frecuentes.html` | Preguntas Frecuentes sobre Administración de Consorcios \| Administración NAKEN | Respuestas a las preguntas más frecuentes sobre administración de consorcios, expensas y cambio de administrador en CABA. |
| `/pages/contacto.html` | Contacto \| Administración NAKEN | Contactate con Administración NAKEN para solicitar una propuesta de administración de consorcios en CABA. |
| `/pages/legal.html` | Política de Privacidad y Aviso Legal \| Administración NAKEN | Política de privacidad y aviso legal de Administración NAKEN. |

## 5. Estrategia SEO implementada (resumen)

- **Un solo H1 por página**, con la palabra clave principal de esa página
  (ej. home = "Administración de Consorcios en CABA").
- **HTML5 semántico**: `<header>`, `<nav>`, `<main>`, `<section>`,
  `<article>`, `<footer>` en vez de divs genéricos.
- **Datos estructurados JSON-LD**: `Organization`, `WebSite` y `Service` en
  la home; `BreadcrumbList` en las páginas internas; `FAQPage` en preguntas
  frecuentes (el texto del schema es idéntico al visible en pantalla, como
  exige Google).
- **Canonical, robots, Open Graph y Twitter Card** en todas las páginas.
- **Rendimiento**: sin frameworks ni librerías pesadas, un solo CSS y un
  solo JS, imagen del hero optimizada a WebP (~244 KB) con
  `fetchpriority="high"` y `preload`, `font-display: swap` en las fuentes,
  sin sliders ni video de fondo.
- **Mobile-first / responsive**: probado visualmente en los breakpoints que
  pediste (320 a 1920px); el menú colapsa a hamburguesa por debajo de 860px.
- **Accesibilidad**: foco visible, labels reales en el formulario,
  `aria-expanded`/`aria-controls` en el FAQ y el menú mobile, `alt`
  descriptivos, `prefers-reduced-motion` respetado.
- **Arquitectura de URLs** amigable y preparada para crecer (servicios,
  cambiar de administrador, barrios de CABA) sin duplicar contenido.

## 6. Cómo conectar el formulario de contacto

El formulario (`/pages/contacto.html`) valida los campos en el navegador
pero **no envía nada a ningún lado todavía** — no inventé un backend, como
pediste. Opciones simples para conectarlo (elegí una):

1. **Formspree** (más rápido): crear una cuenta gratuita, y en
   `js/main.js`, dentro del bloque marcado con el comentario "NOTA PARA
   QUIEN IMPLEMENTE", reemplazar la simulación por un `fetch()` POST al
   endpoint que te da Formspree.
2. **Google Apps Script + Google Sheets**: publicar un script como Web App
   que reciba los datos por POST y los guarde en una planilla; mismo punto
   de reemplazo en `main.js`.
3. Un backend propio, si ya tenés uno.

## 7. Instrucciones para publicar (GitHub Pages, como el sitio actual)

1. Descomprimí el `.zip` entregado.
2. Reemplazá `assets/images/naken-logo.png` y `favicon.ico` por los
   archivos reales del logo (mismo nombre de archivo, o actualizá las
   referencias en el HTML si cambiás el nombre).
3. Completá `pages/legal.html` con el texto legal real.
4. Subí **todo el contenido** de la carpeta a la raíz del repositorio
   `Admnaken/pagina` en GitHub (reemplazando lo que ya existe), respetando
   la estructura de carpetas (`css/`, `js/`, `assets/`, `pages/`).
5. El archivo `CNAME` ya trae `administracionnaken.com.ar`, igual que el
   que ya tenías — no hace falta tocarlo.
6. Verificá que GitHub Pages siga apuntando a la rama `main` (Settings →
   Pages), como ya está configurado.
7. Una vez publicado, repetí el proceso que ya usaste antes: Google Search
   Console → Sitemaps → cargar `sitemap.xml`, y pedir la indexación de la
   home y de las páginas nuevas desde "Inspección de URLs".
8. Probar `Rich Results Test` de Google sobre la home y sobre
   `/pages/preguntas-frecuentes.html` para confirmar que el `FAQPage` se
   valida sin errores.
