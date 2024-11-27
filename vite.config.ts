import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Web Quiz App',
        short_name: 'Quiz App',
        description: 'A quiz app built with Vue 3 and Vite',
        theme_color: '#42b883',
        icons: [
          {
            src: '/3048736.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/3048736.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, 
              },
            },
          },
        ],
      },
    }),
  ],
});