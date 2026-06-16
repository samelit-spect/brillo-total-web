# 📂 Especificación del Stack Tecnológico

Este documento define la arquitectura de software seleccionada para la plataforma **Brillo Total**, justificando la elección de tecnologías bajo criterios de gratuidad (capas libres), rendimiento y compatibilidad con el ecosistema de una Progressive Web App (PWA).

---

## 🛠️ 1. Infraestructura y Stack Elegido

Para garantizar una solución fluida y de código abierto que se adapte al contexto comercial, se optó por una arquitectura **Jamstack / Serverless** integrada de forma directa con servicios en la nube de Google Firebase.

| Capa del Software      | Tecnología Seleccionada                               | Tipo de Recurso y Licencia                         |
| :--------------------- | :---------------------------------------------------- | :------------------------------------------------- |
| **Frontend**           | React (v18+) + TypeScript + Vite                      | Framework de Código Abierto (Licencia MIT)         |
| **Backend (Lógica)**   | Firebase SDK (Serverless / Web SDK Integrado)         | Arquitectura Asíncrona manejada por eventos        |
| **Base de Datos**      | Google Cloud Firestore                                | Motor NoSQL orientado a documentos (Capa Gratuita) |
| **Estrategia Caching** | Service Workers (Cache API) + Firestore Offline Cache | Persistencia e indexación local en el dispositivo  |
| **Infraestructura**    | Netlify                                               | Hosting estático optimizado con CDN global         |

---

## 🏗️ 2. Justificación Arquitectónica de Componentes

### A. Frontend: React + TypeScript
* **Razón de elección:** React permite modularizar la interfaz de "Brillo Total" en componentes independientes reutilizables (tarjetas de productos, controles del carrito, formularios CRUD). **TypeScript** añade tipado estático estricto, impidiendo fallos en caliente al manipular variables críticas como `precioMinorista`, `precioMayorista` o estados de `stock`.

### B. Backend: Arquitectura Serverless (Firebase Cloud SDK)
* **Modelo de Concurrencia (I/O No Bloqueante / Asíncrono):** En lugar de desplegar un servidor tradicional que consuma recursos en hilos dedicados por cada conexión (bloqueante), el SDK de Firebase opera bajo un modelo de **I/O no bloqueante guiado por eventos**.
* **Justificación:** Las consultas al catálogo o las peticiones de modificación del administrador se ejecutan mediante promesas asíncronas. Esto permite atender cientos de peticiones por segundo de clientes concurrentes sin congelar el renderizado de la interfaz de usuario, manteniendo la ligereza típica de una SPA.

### C. Base de Datos: Cloud Firestore (NoSQL)
* **Estructura Flexible:** Al ser una base de datos orientada a documentos, permite que cada producto del catálogo de limpieza tenga atributos flexibles (variantes de fragancias o empaques) sin las restricciones rígidas de esquemas de tablas relacionales (SQL).
* **Sincronización en Tiempo Real:** Firestore incluye oyentes (*listeners*) nativos (`onSnapshot`) que actualizan automáticamente la pantalla de los clientes en cuanto el administrador modifica un precio desde el panel CRUD, sin obligar al usuario a recargar la página.

---

## 💾 3. Persistencia de Datos y Esquema Base

Para visualizar cómo se almacenan y consumen los datos en la nube, se detalla a continuación el modelado de un documento real dentro de la colección `productos` de Firestore:

```json
{
  "id": "prod_84f93a10",
  "nombre": "Detergente Concentrado Ultra",
  "descripcion": "Fórmula desengrasante activa con aroma a limón.",
  "precioMinorista": 1200,
  "precioMayorista": 950,
  "categoria": "hogar",
  "presentacion": "Bidón 5 Litros",
  "stock": true,
  "imagenUrl": "[https://firebasestorage.googleapis.com/.../detergente.png](https://firebasestorage.googleapis.com/.../detergente.png)"
}
```
---

## 🔗 Enlaces Internos
* 📌 Volver al [README.md](../README.md) principal en la raíz.
* 📋 Ir a [01. Planificación y Requerimientos](./01-planificacion.md).
* 🗺️ Ir a [02. Arquitectura de la Información](./02-arquitectura-info.md).
* 🎨 Ir a [03. Diseño de Interfaz (Wireframes)](./03-wireframes.md).
* 📈 Ir a [05. Escalabilidad y Rendimiento](./05-escalabilidad.md).
* 📝 Ir a [06. Historial de Cambios (Changelog)](./06-changelog.md).