import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { ContextProvider } from "./context/context-provider.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
// Uvoz potrebnih knjižnic

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Zagotavlja kontekst za komponente */}
    <ContextProvider>
      {/* Ponuja temo za komponente */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* Zagotavlja usmerjevalnik za aplikacijo */}
        <RouterProvider router={router} />
        {/* Prikaže obvestila */}
        <Toaster />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
