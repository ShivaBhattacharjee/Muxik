import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Muxik",
        short_name: "Muxik",
        description:
          "Muxik is the ultimate destination for streaming and downloading music for free.",
        icons: [
          {
            src: "/images/logo-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/logo-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/images/maskable_icon.png",
            sizes: "203x203",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        display: "standalone",
        background_color: "#1b103f",
        theme_color: "#fff",
      },
    }),
  ],
});
