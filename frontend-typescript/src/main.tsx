import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { QueryProvider } from "./app/providers/query-provider.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>
        </QueryProvider>
    </StrictMode>,
);
