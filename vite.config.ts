// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Aplica actualizaciones de código automáticamente sin molestar al usuario
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Brillo Total Web',
        short_name: 'Brillo Total',
        description: 'Venta y distribución de productos de limpieza por litro',
        theme_color: '#1a365d',      // Color azul oscuro de tu Header para la barra de notificaciones superior del celu
        background_color: '#f8f9fa', // Color gris claro de fondo de tu App para evitar parpadeos blancos al abrirse
        display: 'standalone',       // Esconde la barra del navegador para que se vea como una app nativa
        orientation: 'portrait',     // Fuerza la pantalla en modo vertical optimizado para móviles
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Clave para que Android no recorte de forma fea los bordes del ícono
          }
        ]
      }
    })
  ]
});