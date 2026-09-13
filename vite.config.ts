import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// MPA 다. 라우터를 두지 않고 html 엔트리를 둘 둔다 — 의존성이 안 늘고,
// 나중에 GA 를 붙였을 때 두 페이지가 주소로 저절로 갈린다.
// 배포는 Vercel 이고 주소가 루트라 `base` 는 기본값(/) 그대로 둔다.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        features: fileURLToPath(new URL("./features.html", import.meta.url)),
      },
    },
  },
})
