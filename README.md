---

## ⚙️ Análisis Técnico: SPA y PWA aplicados al proyecto

Para el desarrollo de la plataforma de **Brillo Total**, se seleccionó una arquitectura moderna basada en los conceptos de SPA y PWA. A continuación se detallan sus fundamentos técnicos y la justificación de su aplicación en este caso particular:

### 1. SPA (Single Page Application - Aplicación de Página Única)
*   **Fundamento:** A diferencia de las webs tradicionales que recargan toda la página cada vez que el usuario hace clic en un enlace, una SPA carga una única página HTML inicial. Luego, mediante JavaScript (en nuestro caso, React), intercepta las interacciones del usuario y redibuja de forma dinámica solo los componentes de la pantalla que cambiaron.
*   **Aplicación en Brillo Total:** El catálogo de productos de limpieza requiere dinamismo. Al usar una SPA, cuando el cliente filtre por categorías (ej. "Línea Automotor", "Suavizantes") o agregue un producto al carrito, la interfaz responderá de inmediato sin parpadeos ni esperas de carga. Esto emula la fluidez y velocidad de una aplicación nativa de celular, mejorando drásticamente la experiencia de compra.

### 2. PWA (Progressive Web App - Aplicación Web Progresiva)
*   **Fundamento:** Es una evolución tecnológica que permite transformar una web en una aplicación capaz de instalarse directamente en el dispositivo del usuario (móvil o PC). Se apoya en *Service Workers* (scripts en segundo plano) y un archivo de manifiesto (`manifest.json`) para ofrecer capacidades avanzadas.
*   **Aplicación en Brillo Total:** Esta tecnología es crucial por tres factores del negocio:
    1.  **Instalación sin tiendas:** Al ingresar a la web, el cliente podrá añadir un acceso directo en su pantalla de inicio con el logo de "Brillo Total" sin necesidad de ir a Google Play o App Store. Esto fideliza al comprador recurrente (revendedores y comercios locales de La Rioja) dejándole el negocio a un toque de distancia.
    2.  **Rendimiento y Cache:** Los productos habituales y la estructura de la página se almacenan en el dispositivo. Si el cliente tiene una conexión intermitente o lenta de datos móviles en la calle, el catálogo abrirá igual de rápido.
    3.  **Economía de recursos:** Desarrollar una app nativa para Android y otra para iOS duplicaría los costos y tiempos de desarrollo. La PWA nos permite usar el mismo código web para cubrir todas las plataformas.