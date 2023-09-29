import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

if (import.meta.env.DEV) {
  import("./mocks/browser.js").then(({ worker }) => worker.start());
}

const container = document.querySelector("#root");

if (container !== null) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
