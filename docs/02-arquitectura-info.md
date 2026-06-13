# 📂 Arquitectura de la Información y Flujos de Usuario

Este documento describe la estructura jerárquica de las pantallas de la PWA de **Brillo Total** y el recorrido lógico que realiza un usuario para completar el proceso clave de preventa digital.

---

## 🗺️ 1. Mapa del Sitio (Sitemap)

La aplicación está diseñada bajo el modelo de **SPA (Single Page Application)**, utilizando renderizado condicional y rutas optimizadas para dispositivos móviles. La estructura de navegación e información se organiza de la siguiente manera:

```text
Plataforma Digital "Brillo Total" (Raíz / App.tsx)
│
├── 🔹 Header (<header> - Navegación Global)
│   └── 🔄 Switch de Tarifa Global (Alternador Minorista / Mayorista en Tiempo Real)
│
├── 🖥️ Vistas Principales (<main> - Inyección Dinámica)
│   ├── 🏠 Home.tsx (Catálogo Público General)
│   │   ├── 🐕 Banner Informativo (Identidad Perro Salchicha)
│   │   ├── 🔍 Barra de Búsqueda y Filtros por Categoría
│   │   │   ├── 🧼 Línea Hogar
│   │   │   ├── 🚗 Línea Automotor
│   │   │   └── 🧪 Insumos Industriales
│   │   └── 📦 Grilla de Tarjetas de Productos (Precios dinámicos según el Switch)
│   │
│   ├── 🛒 CarritoView.tsx (Control de Pedido y Totales)
│   │   ├── 📝 Desglose de Artículos Seleccionados
│   │   └── 🟢 Botón de Confirmación y Despacho
│   │
│   ├── 📖 NosotrosView.tsx (Historia y Valores del Emprendimiento)
│   │
│   ├── 📍 UbicacionView.tsx (Información del Local Físico en La Rioja Capital)
│   │
│   └── 🔐 Admin.tsx (Panel CRUD de Inventario - Vista Protegida por Tarjetas)
│       ├── 🔑 Formulario de Validación de Clave Maestra
│       └── 🛠️ Panel de Gestión (Alta, Modificación y Control de Stock Express)
│
└── 🔸 Footer (<footer> - Pie de Página)
    ├── 📞 Enlaces Rápidos de Contacto y Redes
    └── ⚙️ Enlace Discreto al Panel de Administración
```
---

## 🔄 2. Flujo de Usuario (User Flow) - Proceso Clave de Compra

El proceso central de la plataforma consiste en permitir que tanto un cliente particular (minorista) como un revendedor de la región (mayorista) exploren el catálogo, armen su orden de manera interactiva y la despachen de forma automatizada hacia el canal de atención comercial del negocio.

A continuación se detalla la secuencia de pasos lógicos mediante un diagrama de flujo:

```mermaid
graph TD
    A[Inicio: Usuario ingresa a la PWA] --> B[Visualiza Catálogo en Home.tsx]
    B --> C{¿Desea buscar o filtrar?}
    C -- Sí --> D[Aplica Filtro: Hogar / Automotor / Insumos]
    C -- No --> E[Explora la Grilla General de Productos]
    D --> E
    E --> H{¿Activa Switch de Tarifa?}
    H -- Sí / Mayorista --> I[Interfaz conmuta a Precios Mayoristas en Tiempo Real]
    H -- No / Minorista --> J[Interfaz mantiene Precios Minoristas Base]
    I --> F[Añade Productos y Litros al Carrito]
    J --> F
    F --> G[Navega hacia Vista del Carrito y verifica el Desglose]
    G --> K[Presiona Confirmar Pedido por WhatsApp]
    K --> L[El sistema procesa el JSON del Carrito global]
    L --> M[Formatea Mensaje de Texto Estructurado con totales]
    M --> N[Redirecciona automáticamente a la API de WhatsApp]
    N --> O[Fin: Operador de Brillo Total recibe la orden estructurada]

    style A fill:#007BFF,stroke:#333,stroke-width:2px,color:#fff
    style H fill:#f1c40f,stroke:#333,stroke-width:1px,color:#000
    style K fill:#25D366,stroke:#333,stroke-width:2px,color:#fff
    style O fill:#0DCAF0,stroke:#333,stroke-width:2px,color:#fff
```
---

## 🔗 3. Mapa de Conexiones y Enlaces del Repositorio

A continuación se representa gráficamente cómo interactúan el archivo principal y los módulos de la carpeta de documentación:

```mermaid
graph LR
    README[README.md Principal] <--> D1[01-planificacion.md]
    README <--> D2[02-arquitectura-info.md]
    D1 <--> D2
    D2 <--> D3[03-wireframes.md]
    D1 --> D4[04-stack-tecnologico.md]
    D4 <--> D5[05-escalabilidad.md]
    README --> D6[06-changelog.md]

    style README fill:#f9f9f9,stroke:#333,stroke-width:2px
    style D2 fill:#007BFF,stroke:#333,stroke-width:1px,color:#fff
```
---

## 🔗 Enlaces Internos
* 📌 Volver al [README.md](../README.md) principal.
* 🗺️ Ir a [Arquitectura de la Información](./02-arquitectura-info.md).
* ⚙️ Ir a [Especificación del Stack Tecnológico](./04-stack-tecnologico.md).