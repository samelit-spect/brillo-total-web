# 📂 Diseño de Interfaz: Wireframes de Baja Fidelidad

Este documento presenta los bocetos estructurales (wireframes) de las pantallas clave de la PWA de **Brillo Total**, diseñados bajo un enfoque *Mobile-First* para optimizar la experiencia de usuario en teléfonos celulares.

---

## 📐 1. Organización del Diseño Visual

El maquetado se divide en bloques semánticos estandarizados para asegurar consistencia visual en toda la navegación y adaptabilidad inmediata:

| Pantalla / Vista      | Bloques Principales Incluidos                                                                                      | Propósito en la UX                                                                                    |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **🏠 Home (Catálogo)** | `<header>` con menú y **Switch de Tarifa Global**, Banner Informativo, Buscador, Grilla de Productos por Catálogo. | Permitir el escaneo rápido de productos y previsualizar precios Minoristas/Mayoristas en tiempo real. |
| **🛒 CarritoView**     | Listado dinámico de ítems, Cantidades mutables, Desglose de totales con tarifa aplicada, Botón CTA a WhatsApp.     | Centralizar la orden y permitir al cliente auditar sus subtotales de forma clara antes del despacho.  |
| **🔐 Admin (Panel)**   | Formulario central de login por Clave Maestra, Grilla CRUD con formulario adaptado para alta/baja de artículos.    | Ofrecer al administrador una herramienta ágil para modificar precios "en caliente" desde el celular.  |

---

## 🖼️ 2. Bocetos Estructurales

*Nota: Las imágenes a continuación representan la disposición espacial de los elementos antes de la aplicación de estilos CSS definitivos.*

### A. Vista del Catálogo Público (Home)
Se prioriza el acceso directo a las categorías y la visibilidad clara del precio de los productos de limpieza por litro. El Switch superior conmuta los valores de toda la grilla en un solo toque.

![Wireframe del Catálogo Público](./assets/wireframe-home.png)

### B. Vista del Carrito de Compras
Permite verificar la lista de compras, ajustar las cantidades de cada producto y repasar los importes calculados antes de disparar el mensaje automatizado.

![Wireframe del Carrito](./assets/wireframe-carrito.png)

### C. Vista del Panel de Administración (CRUD)
Estructura limpia basada en tarjetas independientes para gestionar el inventario, editar precios y controlar el stock de manera táctil en pantallas chicas.

![Wireframe del Panel Administrativo](./assets/wireframe-admin.png)

---

## 🔗 Enlaces Internos
* 📌 Volver al [README.md](../README.md) principal.
* 🗺️ Ir a [Arquitectura de la Información](./02-arquitectura-info.md).
* ⚙️ Ir a [Especificación del Stack Tecnológico](./04-stack-tecnologico.md).