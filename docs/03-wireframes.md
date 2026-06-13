# 📂 Diseño de Interfaz: Wireframes de Baja Fidelidad

Este documento presenta los bocetos estructurales (wireframes) de las pantallas clave de la PWA de **Brillo Total**, diseñados bajo un enfoque *Mobile-First* para optimizar la experiencia de usuario en teléfonos celulares.

---

## 📐 1. Organización del Diseño Visual

El maquetado se divide en bloques semánticos estandarizados para asegurar consistencia visual en toda la navegación:

| Pantalla / Vista      | Bloques Principales Incluidos                                                                                   | Propósito en la UX                                                                                   |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **🏠 Home (Catálogo)** | `<header>` con menú, Banner Informativo, Buscador, Grilla de Productos con tarjetas operativas.                 | Permitir el escaneo rápido de productos y stock sin fricciones.                                      |
| **🛒 CarritoView**     | Listado dinámico de ítems, Cantidades mutables, Selector de tarifa (Minorista/Mayorista), Botón CTA a WhatsApp. | Centralizar la orden y permitir al cliente auditar sus subtotales de forma clara.                    |
| **🔐 Admin (Panel)**   | Formulario central de login por Clave Maestra, Grilla CRUD con formulario adaptado para alta/baja de artículos. | Ofrecer al administrador una herramienta ágil para modificar precios "en caliente" desde el celular. |

---

## 🖼️ 2. Bocetos Estructurales

*Nota: Las imágenes a continuación representan la disposición espacial de los elementos antes de la aplicación de estilos CSS definitivos.*

### A. Vista del Catálogo Público (Home)
Se prioriza el acceso directo a las categorías y la visibilidad clara del precio de los productos de limpieza por litro.

![Wireframe del Catálogo Público](../src/assets/wireframe-home.png)

### B. Vista del Carrito Dual
Permite verificar la lista de compras y seleccionar el tipo de cliente para adecuar los importes antes del envío.

![Wireframe del Carrito](../src/assets/wireframe-carrito.png)

### C. Vista del Panel de Administración (CRUD)
Estructura limpia basada en tarjetas independientes para gestionar el inventario de manera táctil en pantallas chicas.

![Wireframe del Panel Administrativo](../src/assets/wireframe-admin.png)

---

## 🔗 Enlaces Internos
* 📌 Volver al [README.md](../README.md) principal.
* 🗺️ Ir a [Arquitectura de la Información](./02-arquitectura-info.md).
* ⚙️ Ir a [Especificación del Stack Tecnológico](./04-stack-tecnologico.md).