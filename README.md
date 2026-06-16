# 🧼 Plataforma Digital Centralizada - Brillo Total La Rioja

Solución técnico-digital integral para la gestión, visualización y automatización de pedidos del emprendimiento **Brillo Total**, optimizada para el comercio minorista y canales de distribución mayorista en La Rioja Capital.

---

## 📖 1. Guía de Configuración y Ejecución Local

Estructura de comandos esenciales para clonar, instalar dependencias y ejecutar el entorno de desarrollo de la aplicación.

### Comandos de Consola

```bash
# 1. Clonar el repositorio (Asegúrate de colocar tu enlace correcto)
git clone [https://github.com/tu-usuario/brillo-total-web.git](https://github.com/tu-usuario/brillo-total-web.git)

# 2. Ingresar al directorio del proyecto
cd brillo-total-web

# 3. Instalación de los paquetes y dependencias base
npm install

# 4. Ejecución del servidor de desarrollo local (Vite)
npm run dev
```
---

## 🏪 2. Descripción del Comercio y Contexto

### Datos del Emprendimiento
* **Nombre Comercial:** Brillo Total
* **Ubicación:** La Rioja Capital, Provincia de La Rioja, Argentina.
* **Rubro:** Comercialización, fraccionamiento y distribución de productos de limpieza sueltos y envasados.

### Propósito del Proyecto
La plataforma web centraliza el catálogo de productos de limpieza, automatiza el proceso de preventa mediante el despacho estructurado de pedidos hacia la API de WhatsApp y establece una clara diferenciación operativa entre los canales comerciales minorista (consumo del hogar) y mayorista (revendedores regionales).

---
## 📂 3. Centro de Documentación Centralizado (`/docs`)

Toda la especificación formal de requerimientos, decisiones de ingeniería y el análisis de arquitectura exigidos por la cátedra para la **Etapa 2** han sido organizados en módulos independientes. Puede acceder a ellos a través de los siguientes enlaces internos:

| Módulo Documental                   | Enlace Directo                                  | Contenido e Indicadores Evaluados                                                     |
| :---------------------------------- | :---------------------------------------------- | :------------------------------------------------------------------------------------ |
| **01. Planificación y Alcance**     | [Ver Documento](./docs/01-planificacion.md)     | Ciclo de vida del MVP, Roadmap y **Matriz Completa de Requerimientos (RF y RNF)**.    |
| **02. Arquitectura de Información** | [Ver Documento](./docs/02-arquitectura-info.md) | Mapa del Sitio (Sitemap jerárquico) y Diagrama de Flujo (*User Flow*) en Mermaid.     |
| **03. Maquetado e Interfaz**        | [Ver Documento](./docs/03-wireframes.md)        | Distribución de componentes y Wireframes de baja fidelidad (*Mobile-First*).          |
| **04. Especificación del Stack**    | [Ver Documento](./docs/04-stack-tecnologico.md) | Justificación técnica del ecosistema, concurrencia asíncrona y esquema JSON base.     |
| **05. Escalabilidad y Contexto**    | [Ver Documento](./docs/05-escalabilidad.md)     | Análisis técnico ante picos de tráfico (RPS), enfoque del Teorema CAP (AP) y Caching. |
| **06. Historial de Cambios**        | [Ver Documento](./docs/06-changelog.md)         | Registro de versiones (*Keep a Changelog*) y evolución de commits significativos.     |

---

## ⚙️ 4. Características Tecnológicas Destacadas

La plataforma ha sido diseñada combinando los patrones arquitectónicos de una **Single Page Application (SPA)** y las capacidades móviles de una **Progressive Web App (PWA)**, garantizando las siguientes ventajas operativas:

*   **Navegación Fluida (SPA):** Renderizado dinámico de componentes y filtros en tiempo real sin recargas de página, emulando la experiencia de usuario de una aplicación nativa.
*   **Instalación Directa (PWA):** Acceso directo directo en la pantalla de inicio del dispositivo móvil mediante configuración de `manifest.json`, omitiendo la descarga en tiendas de aplicaciones.
*   **Resiliencia de Red:** Arquitectura preparada para el almacenamiento en caché de activos estáticos, reduciendo el consumo de datos móviles y permitiendo la consulta del catálogo bajo conexiones inestables.

---

## 📦 5. Estructura del Proyecto y Directorios

Para dar cumplimiento a los criterios de componentización modular exigidos por la cátedra, el directorio de desarrollo `/src` alinea su organización interna con las pantallas definidas en el mapa de navegación del sistema:

```text
src/
├── assets/           # Recursos estáticos, logotipos e iconos de la interfaz
├── components/       # Componentes estructurales y de UI globalmente reutilizables
│   ├── Header.tsx    # Barra de navegación superior y branding del comercio
│   ├── Footer.tsx    # Pie de página con accesos informativos y enlace administrativo
│   └── Main.tsx      # Contenedor dinámico principal de la aplicación
├── context/          # Estados globales compartidos (Gestión del carrito y tipo de tarifa)
├── firebase/         # Archivos de configuración e inicialización del SDK de Google
│   └── config.ts     # Conexión centralizada hacia el motor Cloud Firestore
├── hooks/            # Funciones y lógica personalizada (Custom Hooks de estado)
├── info/             # Tipados estrictos de TypeScript y catálogos locales de respaldo
└── views/            # Vistas independientes para el renderizado condicional de la SPA
    ├── Home.tsx      # Pantalla de catálogo público y filtros interactivos de productos
    ├── CarritoView.tsx # Desglose de ítems, cálculo de subtotales y CTA a WhatsApp
    ├── NosotrosView.tsx # Sección informativa sobre la trayectoria de la empresa
    ├── UbicacionView.tsx # Datos de geolocalización del comercio físico
    └── Admin.tsx     # Panel CRUD privado para la gestión de inventario por tarjetas
├── App.tsx           # Componente raíz encargado de la orquestación de las vistas
└── main.tsx          # Punto de entrada de la aplicación hacia el DOM del navegador
```

---

### Maquetación Estructural y Semántica (HTML5)

La distribución global de la interfaz implementa etiquetas semánticas estándar para optimizar la accesibilidad móvil y el procesamiento de la Single Page Application:

* **`<header>`:** Contiene los elementos de identidad visual, el logotipo central de **Brillo Total** y el menú de navegación adaptativo.
* **`<main>`:** Actúa como el contenedor dinámico donde se inyectan las grillas de productos, filtros de categorías y la pasarela del carrito.
* **`<footer>`:** Aloja los datos de contacto del comercio físico, horarios de atención y el control de acceso privado al panel administrativo.

---

## 🎨 6. Interfaz y Lineamientos de Diseño (UI)

Para asegurar una experiencia de usuario (UX) homogénea, con alta legibilidad y adaptada a dispositivos móviles, la interfaz de la PWA implementa los siguientes tokens de diseño:

### Paleta de Colores
* **Color Primario:** `#007BFF` (Azul). Aplicado en botones de acción principal (CTA), estados activos y elementos de interacción clave.
* **Color Secundario:** `#0DCAF0` (Cian). Utilizado para etiquetas decorativas, insignias de estado y realce de categorías.
* **Colores Neutros:** `#F8F9FA` para fondos de contenedor (sensación de pulcritud) y `#212529` para textos (garantizando un contraste óptimo de lectura).
* **Estado Crítico:** `#DC3545` (Rojo). Reservado de forma exclusiva para indicadores de falta de stock o alertas del sistema.

### Tipografía y Jerarquía
* **Familia Tipográfica:** Sans-serif (`Inter` / `Roboto`), priorizando el escaneo rápido en pantallas móviles.
* **Encabezados:** Pesos en negrita (`700/800`) para títulos de secciones y nombres de productos en el catálogo.
* **Cuerpo y Precios:** Pesos regulares (`400/500`) enfocados en optimizar la visualización de los importes minoristas y mayoristas.

---

## 🎛️ 7. Módulo Administrativo de Gestión

La plataforma incorpora una sección privada accesible de forma estratégica desde el pie de página (`Footer`), orientada a facilitar la administración del negocio sin requerir modificaciones directas en el código fuente:

* **Control de Acceso:** Restricción de la vista mediante validación por clave maestra (*Admin Token*), asegurando que solo el operador comercial acceda a las herramientas críticas.
* **Operaciones CRUD de Inventario:**
  * **Alta de Artículos:** Formulario estructurado para incorporar nuevos productos especificando categorías, precios diferenciales y presentaciones.
  * **Modificación en Caliente:** Interfaz adaptativa que permite seleccionar cualquier producto existente para actualizar precios, descripción o alternar el estado de disponibilidad de stock al instante.

---

## 🔗 8. Información de Entrega y Despliegue

A continuación se facilitan los accesos oficiales para la evaluación técnica correspondientes a la **Etapa 2**:

* **Nombre del Repositorio:** `brillo-total-web`
* **Código Fuente:** [Ver Repositorio en GitHub](https://github.com/samelit-spect/brillo-total-web)
* **Plataforma en Producción:** [Visitar Sitio Web en Vivo](https://brillo-total.netlify.app)

---

## 🚀 9. Próximos Pasos e Integraciones Futuras

Como parte de la evolución modular planificada para el Producto Mínimo Viable (MVP), las fases posteriores contemplan:

1. **Autenticación Formal:** Reemplazar el acceso por token local mediante la integración de **Firebase Authentication** para la gestión de roles.
2. **Pasarela de Pagos:** Incorporación del SDK de **Mercado Pago** para automatizar la recaudación electrónica directa en el canal minorista.
3. **Persistencia Avanzada Offline:** Optimización de Service Workers para permitir el armado y sincronización diferida de pedidos en zonas con conectividad restringida.

---