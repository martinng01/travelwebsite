import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobeComponent from "./Globe.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobeComponent />
  </StrictMode>
);
