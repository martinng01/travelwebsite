import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import theme from "./theme.js";
import { MDXProvider } from "@mdx-js/react";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MDXProvider>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </MDXProvider>
  </StrictMode>
);
