import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.tsx";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import "./index.css";

console.log("main.jsx");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
