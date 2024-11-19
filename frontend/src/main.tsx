import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/Dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";

const originalConsoleError = console.error;
console.error = (message, ...args) => {
  if (message.includes("deprecated")) {
    return;
  }

  originalConsoleError(message, ...args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
