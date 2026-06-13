# 📂 Especificación del Stack Tecnológico

Este documento define la arquitectura de software seleccionada para la plataforma **Brillo Total**, justificando la elección de tecnologías bajo criterios de gratuidad (capas libres), rendimiento y compatibilidad con el ecosistema de una Progressive Web App (PWA).

---

## 🛠️ 1. Infraestructura y Stack Elegido

Para garantizar una solución fluida y de código abierto que se adapte al contexto comercial, se optó por una arquitectura **Jamstack / Serverless** integrada de forma directa con servicios en la nube de Google Firebase.

| Capa del Software      | Tecnología Seleccionada                               | Tipo de Recurso y Licencia                         |
| :--------------------- | :---------------------------------------------------- | :------------------------------------------------- |
| **Frontend**           | React (v18+) + TypeScript + Vite                      | Framework de Código Abierto (Licencia MIT)         |
| **Backend (Lógica)**   | Firebase SDK (Serverless / Cloud Functions)           | Arquitectura Asíncrona manejada por eventos        |
| **Base de Datos**      | Google Cloud Firestore                                | Motor NoSQL orientado a documentos (Capa Gratuita) |
| **Estrategia Caching** | Service Workers (Cache API) + Firestore Offline Cache | Persistencia e indexación local en el dispositivo  |
| **Infraestructura**    | Netlify / Vercel                                      | Hosting estático optimizado con CDN global         |

---

## 🏗️ 2. Justificación Arquitectónica de Componentes

### A. Frontend: React + TypeScript
* **Razón de elección:** React permite modularizar la interfaz de "Brillo Total" en componentes independientes reutilizables (tarjetas de productos, controles del carrito, formularios CRUD). **TypeScript** añade tipado estático estricto, impidiendo fallos en caliente al manipular variables críticas como `precioMinorista`, `precioMayorista` o estados de `stock`.

### B. Backend: Arquitectura Serverless (Firebase Cloud SDK)
* **Modelo de Concurrencia (I/O No Bloqueante / Asíncrono):** En lugar de desplegar un servidor tradicional que consuma recursos en hilos dedicados por cada conexión (bloqueante), el SDK de Firebase opera bajo un modelo de **I/O no bloqueante guiado por eventos**.
* **Justificación:** Las consultas al catálogo o las peticiones de modificación del administrador se ejecutan mediante promesas asíncronas. Esto permite atender cientos de peticiones por segundo de clientes concurrentes sin congelar el renderizado de la interfaz de usuario, manteniendo la ligereza típica de una SPA.

### C. Base de Datos: Cloud Firestore (NoSQL)
* **Estructura Flexible:** Al ser una base de datos orientada a documentos (JSON/BSON), permite que cada producto del catálogo de limpieza tenga atributos flexibles (variantes de fragancias, empaques sueltos por litro o envasados) sin las restricciones rígidas de esquemas de tablas relacionales (SQL).
* **Sincronización en Tiempo Real:** Firestore incluye oyentes (*listeners*) nativos que actualizan automáticamente la pantalla de los clientes en cuanto el administrador modifica un precio desde el panel CRUD, sin obligar al usuario a recargar la página.

---

## 💾 3. Persistencia de Datos y Esquema Base (JSON)

Para anticipar razonablemente cómo se almacenan y consumen los datos desde la nube, se define la estructura tipada del documento de la colección `productos` utilizando bloques de código:

```json
{
  "$schema": "[http://json-schema.org/draft-07/schema#](http://json-schema.org/draft-07/schema#)",
  "title": "ProductoBrilloTotal",
  "type": "object",
  "required": [
    "id",
    "nombre",
    "descripcion",
    "precioMinorista",
    "precioMayorista",
    "categoria",
    "presentacion",
    "stock",
    "imagenUrl"
  ],
  "properties": {
    "id": { "type": "string", "description": "ID único generado por Firestore" },
    "nombre": { "type": "string", "example": "Detergente Concentrado Ultra" },
    "descripcion": { "type": "string", "example": "Fórmula desengrasante activa con aroma a limón" },
    "precioMinorista": { "type": "number", "minimum": 0 },
    "precioMayorista": { "type": "number", "minimum": 0 },
    "categoria": { "type": "string", "enum": ["hogar", "automotor", "insumos"] },
    "presentacion": { "type": "string", "example": "Bidón 5 Litros / Suelto por Litro" },
    "stock": { "type": "boolean", "default": true },
    "imagenUrl": { "type": "string", "format": "uri" }
  }
}
```
---

### Enlaces Directos de Navegación:
* 📌 Volver al [README.md](../README.md) principal en la raíz.
* 📋 Ir a [Planificación y Requerimientos](./01-planificacion.md).
* 🎨 Ir a [Estructura de Wireframes](./03-wireframes.md).