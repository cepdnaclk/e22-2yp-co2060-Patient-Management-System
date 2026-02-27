import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


import { AuthProvider } from "./features/auth/AuthContext.jsx";
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>
        <App />
      </AuthProvider>

    </BrowserRouter>
  </StrictMode>,
);
