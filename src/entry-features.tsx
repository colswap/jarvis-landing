import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { initAnalytics } from "./analytics"
import "./fonts.css"
import "./index.css"
import { Features } from "./pages/Features"

initAnalytics()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Features />
  </StrictMode>,
)
