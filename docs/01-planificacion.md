# 📂 Planificación del Proyecto y Requerimientos

Este documento detalla la hoja de ruta (Roadmap) y los requerimientos de software para la plataforma digital de **Brillo Total**, optimizada como una Progressive Web App (PWA) para la comercialización de productos de limpieza en La Rioja Capital.

---

## 🗺️ 1. Roadmap del Proyecto (Enfoque MVP)

El desarrollo de la plataforma se planifica en tres fases incrementales, priorizando en primer lugar un **Producto Mínimo Viable (MVP)** para habilitar la preventa digital rápidamente y luego escalar en robustez técnica.

### Fase 1: Entorno Base y Catálogo Dinámico (MVP)
- [x] Configuración del entorno profesional con React, TypeScript y Vite.
- [x] Despliegue continuo automatizado en la plataforma Netlify.
- [x] Integración de la base de datos NoSQL con Google Firebase Cloud Firestore.
- [x] Maquetación semántica y responsiva del catálogo público (Líneas Hogar, Automotor e Insumos).
- [x] Panel CRUD de administración optimizado para móviles mediante diseño adaptativo de tarjetas y protegido por Clave Maestra local.

### Fase 2: Automatización, Flujos de Compra y PWA (Etapa Actual - 90% Completado)
- [x] Implementación del módulo de Carrito de Compras interactivo (cálculo de subtotales en tiempo real).
- [x] Integración de la Pasarela de Despacho automatizada hacia la API de WhatsApp.
- [x] Configuración avanzada de PWA (`manifest.json` y Service Workers para soporte offline del catálogo, incluyendo iconos personalizados).
- [x] Diferenciación de tarifas en la interfaz para canales Minorista y Mayorista mediante Switch interactivo.
- [x] Migración completa de la documentación a la carpeta `/docs` con múltiples módulos Markdown.
- [ ] Carga final de imágenes optimizadas para los productos en Cloud Firestore y configuración de la localización exacta del comercio en la vista de Ubicación.

### Fase 3: Robustez, Pagos y Analíticas (Escalabilidad Futura)
- [ ] Reemplazo del token local por un sistema de autenticación seguro mediante **Firebase Authentication**.
- [ ] Integración del SDK de **Mercado Pago** para automatizar el cobro electrónico minorista.
- [ ] Módulo de Analíticas y Reportes con gráficos interactivos para el monitoreo de stock e ingresos.
- [ ] Optimización de Service Workers para persistencia avanzada y sincronización en zonas sin cobertura de red.

---

## 📋 2. Requerimientos del Sistema (SRS)

A continuación, se especifican de forma medible y concreta las capacidades que debe poseer el sistema (Funcionales) y las restricciones o atributos de calidad bajo los cuales debe operar (No Funcionales).

### A. Requerimientos Funcionales (RF)

| Código    | Requerimiento                       | Descripción Detallada                                                                                                                                                                                                                |
| :-------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RF-01** | Gestión de Catálogo Público         | El sistema debe permitir a cualquier usuario visualizar la lista completa de productos disponibles filtrados de manera interactiva por categorías (Línea Hogar, Línea Automotor, Insumos).                                           |
| **RF-02** | Persistencia Dinámica               | La visualización del stock y los precios minoristas/mayoristas debe sincronizarse de manera asíncrona directamente desde la base de datos distribuida en la nube (Cloud Firestore).                                                  |
| **RF-03** | Módulo de Carrito de Compras        | El sistema debe permitir al usuario agregar, restar y eliminar unidades de productos por litro o presentación, calculando el subtotal instantáneamente según el tipo de tarifa aplicada (Minorista / Mayorista).                     |
| **RF-04** | Pasarela de Despacho por WhatsApp   | El sistema debe procesar el estado del carrito, formatear un mensaje de texto plano estructurado con el desglose del pedido e interactuar con la API de WhatsApp para derivar la orden al operador comercial.                        |
| **RF-05** | Panel Administrativo CRUD           | El sistema debe proveer una interfaz privada para realizar altas de nuevos productos y modificaciones en caliente de los atributos de precio, presentación y stock, visualizados mediante un listado responsivo de tarjetas (Cards). |
| **RF-06** | Control de Acceso del Administrador | La vista de administración debe estar protegida mediante un filtro de validación por token de acceso (Clave Maestra) del lado del cliente para bloquear accesos no autorizados.                                                      |

### B. Requerimientos No Funcionales (RNF)

| Código     | Requerimiento                        | Descripción Detallada                                                                                                                                                                                                         |
| :--------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF-01** | Responsividad Móvil (Mobile-First)   | La interfaz completa (pública y administrativa) debe ser 100% responsiva, adaptando sus formularios y grillas mediante layouts flexibles y componentes desacoplados para evitar scrolls laterales defectuosos en smartphones. |
| **RNF-02** | Arquitectura PWA Instalable          | El sistema debe incluir un archivo de manifiesto web (`manifest.json`) y Service Workers que permitan su instalación directa en Android/iOS y garanticen un funcionamiento fluido bajo redes móviles inestables.              |
| **RNF-03** | Velocidad de Respuesta (Performance) | El tiempo de renderizado de la interfaz ante el cambio de rutas, aplicaciones de filtros o mutaciones del carrito debe ser inferior a 150ms gracias al motor de renderizado de React (SPA).                                   |
| **RNF-04** | Mantenibilidad y Fuertemente Tipado  | El código fuente de la aplicación debe estructurarse mediante componentes modulares fuertemente tipados utilizando **TypeScript**, minimizando fallos imprevistos en tiempo de ejecución.                                     |


## 🔗 Enlaces Internos
* 📌 Volver al [README.md](../README.md) principal en la raíz.
* 🗺️ Ir a [02. Arquitectura de la Información](./02-arquitectura-info.md).
* 🎨 Ir a [03. Diseño de Interfaz (Wireframes)](./03-wireframes.md).
* ⚙️ Ir a [04. Especificación del Stack Tecnológico](./04-stack-tecnologico.md).
* 📈 Ir a [05. Escalabilidad y Rendimiento](./05-escalabilidad.md).
* 📝 Ir a [06. Historial de Cambios (Changelog)](./06-changelog.md).