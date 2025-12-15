import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "animalsMF",
      filename: "remoteEntry.js",
      exposes: {
        "./AnimalsList":
          "./src/features/animals-list/components/AnimalsList.jsx",
        "./AnimalDetail":
          "./src/features/animal-detail/components/AnimalDetail.jsx",
        "./AnimalForm": "./src/features/animal-form/components/AnimalForm.jsx",
        "./AnimalsStore": "./src/shared/store/animalsStore.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-router-dom": {
          singleton: true,
        },
        zustand: { singleton: true },
        axios: {},
        "framer-motion": { singleton: true },
        "lucide-react": { singleton: true },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5002,
    cors: true,
  },
});
