import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { initAnalytics } from "./analytics"
import "./fonts.css"
import "./index.css"
import { Home } from "./pages/Home"

initAnalytics()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
