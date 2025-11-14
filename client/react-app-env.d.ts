/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  // tu peux ajouter d'autres variables VITE_* ici si besoin
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
