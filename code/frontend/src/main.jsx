import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";


const AppWithOptionalNavbar = () => {
  const { pathname } = useLocation();
  const hideNavbar = pathname === "/patient" || pathname.startsWith("/patient/") || pathname === "/doctor" || pathname.startsWith("/doctor/") || pathname === "/admin" || pathname.startsWith("/admin/");
  return (
    <>
      {!hideNavbar && <Navbar />}
      <App />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppWithOptionalNavbar />
    </BrowserRouter>
  </StrictMode>,
);
