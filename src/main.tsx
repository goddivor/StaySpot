import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./pages";
import { ToastContainer } from "./components/Toast";
import { ToastProvider } from "./context/toast-context";

createRoot(document.getElementById("root")!).render(
  <ToastProvider>
    <AppRouter />
    <ToastContainer />
  </ToastProvider>
);
