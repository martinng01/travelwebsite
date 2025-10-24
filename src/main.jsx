import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobeComponent from "./Globe.jsx";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider>
      <GlobeComponent />
    </MantineProvider>
  </StrictMode>
);
