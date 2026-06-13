# 📂 Historial de Cambios (Changelog)

Todos los cambios notables y evoluciones del proyecto de la PWA para **Brillo Total** se documentarán en este archivo, siguiendo estrictamente los lineamientos de [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) y la especificación de [Versionado Semántico](https://semver.org/lang/es/).

---

## [0.2.0] - 2026-06-13
### Added
* **Documentación Técnica de la Etapa 2:** Creación de los módulos especializados dentro de la carpeta `docs/`.
* **Módulo de Planificación (`01-planificacion.md`):** Definición formal del alcance del MVP, historias de usuario, requerimientos funcionales y matriz de riesgos del software.
* **Módulo de Arquitectura (`02-arquitectura-info.md`):** Diseño detallado del Mapa del Sitio, árbol de directorios del repositorio y diagrama de flujo interactivo en formato Mermaid.
* **Módulo de Interfaz (`03-wireframes.md`):** Maquetación estructural de las vistas de Catálogo, Carrito y Panel CRUD del Administrador bajo enfoque Mobile-First.
* **Módulo de Infraestructura (`04-stack-tecnologico.md`):** Justificación del backend serverless, persistencia en Google Cloud Firestore y definición del esquema JSON estructurado para el catálogo.
* **Módulo de Escalabilidad (`05-escalabilidad.md`):** Análisis formal de concurrencia (RPS), postura ante el Teorema CAP (enfoque AP) y justificación socio-económica adaptada al contexto regional.

### Changed
* Reestructuración del `README.md` principal para actuar como índice centralizado y punto de acceso al sistema de documentación.

---

## [0.1.0] - 2026-05-20
### Added
* Estructura inicial del repositorio de Git.
* Inicialización del proyecto Frontend utilizando React, TypeScript y Vite.
* Maquetado base de los componentes del catálogo público.

---

> **Guía de Lectura de Versiones:**
> * **MAJOR (X.0.0):** Cambios que rompen la compatibilidad hacia atrás.
> * **MINOR (0.Y.0):** Funcionalidades nuevas sin romper compatibilidad (como este bloque de documentación).
> * **PATCH (0.0.Z):** Corrección de errores menores o refactorización de código.

---

## 🔗 Enlaces Internos
* 📌 Volver al [README.md](../README.md) principal.
* 📋 Ir a [Planificación y Requerimientos](./01-planificacion.md).