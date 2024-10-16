import { ThemeProvider } from "@providers";
import { routersConfig } from "@routes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={createBrowserRouter(routersConfig)} />
    </ThemeProvider>
  </StrictMode>,
);
