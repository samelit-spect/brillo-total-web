# 🧼 Plataforma Digital Centralizada - Brillo Total La Rioja

Solución técnico-digital integral para la gestión, visualización y automatización de pedidos del emprendimiento **Brillo Total**, optimizada para el comercio minorista y canales de distribución mayorista.

---

## 📖 1. Guía de Configuración y Despliegue del Entorno

Estructura de comandos esenciales para inicializar, instalar dependencias y ejecutar el proyecto en un entorno de desarrollo local.

### Comandos de Consola

```bash
# Inicialización del proyecto con Vite y la arquitectura React + TypeScript
npm create vite@latest brillo-total-web -- --template react-ts

# Instalación de los paquetes y dependencias base
npm install

# Ejecución del servidor de desarrollo local
npm run dev
```
---

### Arquitectura de Componentes según el Entorno

A continuación se detalla cómo se distribuyen y operan los componentes del software entre la etapa de desarrollo y el despliegue final en producción:

| Componente Técnico         | Entorno de Desarrollo Local      | Entorno de Producción         | Tipo de Recurso   |
| :------------------------- | :------------------------------- | :---------------------------- | :---------------- |
| **Servidor de Aplicación** | Vite Dev Server (`localhost`)    | GitHub Pages / Vercel         | Hosting estático  |
| **Manejo de Estado**       | LocalStorage / Mock Data         | Context API + Estado Global   | Lógica de negocio |
| **Persistencia de Datos**  | Memoria Local / Arrays de Prueba | API REST / Base de Datos      | Almacenamiento    |
| **Proceso de Compilación** | Código TypeScript Nativo         | JavaScript Minificado (Build) | Distribución      |

---

## 🏪 2. Descripción del Comercio y Objetivos del Proyecto

### Datos del Emprendimiento
* **Nombre Comercial:** Brillo Total
* **Ubicación:** La Rioja Capital, Provincia de La Rioja, Argentina.
* **Rubro:** Comercialización, fraccionamiento y distribución de productos de limpieza sueltos y envasados.

### Objetivos Operativos de la Plataforma
La implementación de esta web centralizada busca resolver las problemáticas de comunicación, stock y logística del negocio a través de tres metas principales:

1. **Centralización del Catálogo:** Ofrecer un espacio digital único donde los clientes visualicen el stock disponible, variantes de fragancias y precios actualizados en tiempo real.
2. **Automatización de la Preventa (Enlace a WhatsApp):** Optimizar la toma de pedidos permitiendo que el usuario arme su carrito de compras de manera interactiva. Al finalizar, el sistema genera un mensaje estructurado listo para enviar al WhatsApp del negocio, acelerando el tiempo de preparación del pedido.
3. **Diferenciación de Canales comerciales:** Proveer una experiencia de usuario adaptada que permita tanto a los compradores del hogar (minoristas) como a los revendedores de la región (mayoristas) operar con las tarifas y escalas correspondientes.

---

## ⚙️ 3. Análisis Arquitectónico: SPA y PWA

Para garantizar el rendimiento, la fluidez y la usabilidad de la plataforma en dispositivos móviles, el sistema se apoya en dos pilares tecnológicos:

### A. SPA (Single Page Application)
* **Fundamento Técnico:** A diferencia de los sitios web tradicionales multipágina que solicitan un archivo HTML completo al servidor ante cada navegación, una SPA descarga una única estructura inicial. El motor de React intercepta las interacciones del usuario y redibuja dinámicamente solo las secciones de la pantalla que cambiaron, sin recargar el navegador.
* **Justificación:** El catálogo de productos requiere agilidad inmediata. Al interactuar con filtros de categorías (ej. *Línea Automotor*, *Suavizantes*) o modificar cantidades en el carrito, la interfaz responde al instante sin parpadeos ni tiempos muertos de carga, emulando la experiencia de una app nativa.

### B. PWA (Progressive Web App)
* **Fundamento Técnico:** Permite que una aplicación web aproveche capacidades nativas del dispositivo mediante el uso de un archivo de manifiesto (`manifest.json`) para la identidad visual y *Service Workers* que corren en segundo plano gestionando la caché y las peticiones de red.
* **Justificación:** Esta tecnología responde de forma directa a las necesidades de conectividad del entorno:
    1. **Instalación Directa:** Los clientes y revendedores frecuentes pueden añadir un acceso directo con el icono de *Brillo Total* en su pantalla de inicio directamente desde el navegador, sin necesidad de descargar ejecutables pesados desde tiendas de aplicaciones.
    2. **Persistencia en Conexiones Lentas:** Al almacenar la estructura base de la web y los datos esenciales en la caché local del dispositivo, el catálogo se despliega de forma instantánea incluso si el usuario se encuentra en la vía pública con datos móviles inestables o de baja velocidad.
    3. **Eficiencia de Mantenimiento:** Mantiene un único código fuente basado en tecnologías web estándar que funciona nativamente en Android, iOS y computadoras de escritorio.

---

## 📦 4. Entorno, Frameworks y Estructura del Proyecto

### Inicialización del Entorno
La base de la plataforma se construyó utilizando **React** junto con **TypeScript** sobre el motor de construcción **Vite**. Esta combinación garantiza un tipado estático seguro para evitar errores en el manejo del catálogo y una velocidad de refresco instantánea durante el desarrollo local.

### Componentización: Arquitectura de Carpetas
Para mantener un código limpio, modular y mantenible a medida que el sistema crezca (canales mayoristas, manejo de stock), se definió la siguiente estructura organizativa dentro del directorio `src/`:

```text
src/
├── assets/          # Imágenes de marca, iconos y recursos estáticos
├── components/      # Componentes reutilizables de la interfaz (UI)
│   ├── Header.tsx   # Barra de navegación superior
│   ├── Footer.tsx   # Pie de página con datos de contacto
│   └── Main.tsx     # Contenedor principal de la aplicación
├── context/         # Estado global (Carrito de compras y tipo de tarifa)
├── hooks/           # Funciones lógicas personalizadas (Custom Hooks)
├── info/            # Catálogo estático de productos (Línea Hogar y Automotor)
|__ views            # Pantallas principales de la SPA (ej. Home/Catálogo, Vista de Carrito)
├── App.tsx          # Componente raíz donde se orquestan las secciones
└── main.tsx         # Punto de entrada de la aplicación para el DOM
```
---

### HTML Semántico y Estructura Global
El diseño del software implementa de forma estricta las etiquetas semánticas estándar de HTML5. Esto asegura una correcta interpretación por parte de los motores de búsqueda (SEO) y mejora la accesibilidad del sitio en dispositivos móviles.

La distribución e infraestructura de bloques semánticos se organiza de la siguiente manera:

* `<header>`: Contiene los elementos de identidad visual, logotipo de **Brillo Total** y las opciones de navegación del catálogo.
* `<main>`: Actúa como el contenedor principal donde se inyecta dinámicamente la grilla de productos, el carrito de compras y los filtros de selección.
* `<footer>`: Define el pie de página que aloja la información de contacto, horarios de atención y enlaces directos al soporte o redes comerciales del negocio.


---

## 🔗 5. Información de Entrega y Despliegue

A continuación se facilitan los accesos oficiales para la evaluación de la primera entrega del proyecto:

* **Nombre del Repositorio:** `brillo-total-web`
* **Enlace al Repositorio Remoto:** [Ver Código en GitHub](https://github.com/samelit-spect/brillo-total-web)
* **Sitio Web en Producción (Despliegue):** [Visitar Plataforma En Vivo](brillo-total.netlify.app)

### Estado Actual del Proyecto
Se ha consolidado con éxito la estructura base inicial requerida, cumpliendo con el uso estricto de HTML semántico a través de la modularización de sus tres componentes principales:
1. **Header:** Barra de navegación e identidad del comercio.
2. **Main:** Contenedor dinámico principal para el futuro catálogo.
3. **Footer:** Pie de página institucional con datos de contacto.

---

## Módulo: Integración de Base de Datos NoSQL en Tiempo Real (Firebase Firestore)

Para garantizar la escalabilidad de la PWA "Brillo Total" y permitir la gestión dinámica de precios y stock por parte del administrador, se migró la arquitectura de datos de un estado estático (Hardcoded) a una solución de base de datos en la nube.

### 1. Decisiones de Arquitectura y Configuración
* **Tecnología Seleccionada:** Google Firebase Firestore.
* **Modelo de Datos:** NoSQL orientado a documentos (Estructura flexible, ideal para sincronización offline en aplicaciones móviles y PWAs).
* **Región de Servidor:** `us-central1` (Iowa, EE. UU.) seleccionada por sus bajos tiempos de latencia y óptimo rendimiento dentro de la capa gratuita (Spark Plan).
* **Modo de Seguridad Inicial:** Modo de prueba (Permisos de lectura/escritura abiertos temporalmente en ambiente de desarrollo).

### 2. Infraestructura del Código (Frontend en React + TypeScript)
* Se instaló la dependencia oficial `firebase` a través del gestor de paquetes npm.
* Se implementó el archivo de configuración centralizado en `src/firebase/config.ts` encargado de inicializar el SDK de Google y exportar la instancia de la base de datos (`db`) mediante el método `getFirestore()`.

### 3. Proceso de Migración y Semillado (Seeding)
Para poblar la base de datos sin necesidad de cargas manuales, se diseñó un script de migración asíncrono temporal en el ciclo de vida del componente principal (`useEffect`), estructurado bajo la siguiente interfaz de TypeScript:

* **Estructura del Documento (`Producto`):**
  * `id` (string)
  * `nombre` (string)
  * `descripcion` (string)
  * `precioMinorista` (number)
  * `precioMayorista` (number)
  * `categoria` ('hogar' | 'automotor' | 'insumos')
  * `presentacion` (string)
  * `stock` (boolean)
  * `imagenUrl` (string)

**Resultado:** Se migraron con éxito los 7 productos iniciales del catálogo hacia la colección `"productos"` en la consola de Firebase, quedando la infraestructura lista para el consumo de datos en tiempo real.

---

## Guía de Estilos e Identidad Visual (UI)

Para garantizar una experiencia de usuario (UX) coherente, profesional y con alta legibilidad, se definió un sistema de diseño basado en una paleta cromática que evoca limpieza, frescura y confianza, alineada al rubro comercial de "Brillo Total".

### 1. Paleta de Colores (Design Tokens)
La aplicación utiliza un esquema de colores controlado para mantener el contraste y cumplir con las pautas de accesibilidad web (WCAG):

*   **Color Primario (Primary Blue):** `#007BFF` (o el azul que uses en tu Tailwind/CSS). Representa el agua, la tecnología y la confianza. Se utiliza en botones principales, llamados a la acción (CTA) y estados activos.
*   **Color Secundario (Cyan/Teal):** `#0DCAF0` (o tu variante). Evoca frescura y limpieza profunda. Utilizado para destacar categorías (como "Automotor" o "Insumos") y elementos decorativos sutiles.
*   **Colores Neutros (Grayscale):**
    *   **Fondo Principal:** `#F8F9FA` / `#FFFFFF`. Blancos y grises muy claros para dar sensación de pulcritud, amplitud y espacio limpio.
    *   **Texto Principal:** `#212529` (Gris oscuro/Casi negro). Garantiza un contraste óptimo sobre fondos claros, evitando la fatiga visual del usuario al leer el catálogo.
    *   **Texto Secundario/Descripciones:** `#6C757D` (Gris medio). Para detalles de menor jerarquía como descripciones de productos o subtítulos.
*   **Color de Alerta/Estado (Danger):** `#DC3545` (Rojo). Utilizado exclusivamente para indicar la falta de stock o errores en el sistema.

### 2. Sistema Tipográfico
Se seleccionó una familia tipográfica de tipo **Sans-serif (palo seco)** para priorizar la velocidad de lectura en pantallas de dispositivos móviles, factor crítico para una Progressive Web App (PWA):

*   **Tipografía Principal:** `Inter` / `Roboto` (o `System-UI` según la que tengas configurada). 
*   **Criterios de Aplicación:**
    *   **Títulos y Encabezados (Headings):** Estilos en negrita (`Font-Bold`, pesos 700/800) para capturar la atención inmediata en nombres de productos y secciones del panel.
    *   **Cuerpo de Texto y Precios (Body/Prices):** Pesos regulares y medianos (400/500) que optimizan el escaneo rápido de los importes minoristas y mayoristas.