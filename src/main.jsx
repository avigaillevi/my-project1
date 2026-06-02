import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundaries.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

createRoot(document.getElementById("root")).render(
  <div className="min-h-screen bg-indigo-50 ">
    <StrictMode>
      <ErrorBoundary fallback={<ErrorPage />}>
        <App />
      </ErrorBoundary>
    </StrictMode>
  </div>,
);
