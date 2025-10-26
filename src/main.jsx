import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { MDXProvider } from "@mdx-js/react";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <MDXProvider>
        <App />
      </MDXProvider>
    </MantineProvider>
  </StrictMode>
);
