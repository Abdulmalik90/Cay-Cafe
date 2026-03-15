import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import Router
import App from "./app/App.tsx";
import "./styles/index.css";
import { LanguageProvider } from "./app/components/LanguageContext.jsx"; 

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LanguageProvider>
);