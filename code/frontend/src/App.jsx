import Signup from "./features/auth/Signup.jsx";
import Login from "./features/auth/Login.jsx";
import "./App.css";
import Home from "./pages/Home.jsx";
import Aboutus from "./pages/Aboutus.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import FAQ from "./pages/FAQ.jsx";
import DoctorDashboard from "./features/dashboard/DoctorDashboard.jsx";
import NurseDashboard from "./features/dashboard/NurseDashboard.jsx";
import PatientDashboard from "./features/dashboard/PatientDashboard.jsx";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { ProtectedRoute } from "./features/auth/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import AdminDashboard from "./features/dashboard/AdminDashboard.jsx";
import ReceptionistDashboard from "./features/dashboard/ReceptionistDashboard.jsx";
import PharmacistDashboard from "./features/dashboard/PharmacistDashboard.jsx";
import LabTechnicianDashboard from "./features/dashboard/LabTechnicianDashboard.jsx";
import ManagementDashboard from "./features/dashboard/ManagementDashboard.jsx";
import BillingStaffDashboard from "./features/dashboard/BillingStaffDashboard.jsx";
import AmbientOrbs from "./components/AmbientOrbs.jsx";
import NavbarLanding from "./components/NavbarLanding.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const AuthWrapper = GOOGLE_CLIENT_ID ? GoogleOAuthProvider : ({ children }) => <>{children}</>;
const authWrapperProps = GOOGLE_CLIENT_ID ? { clientId: GOOGLE_CLIENT_ID } : {};

function App() {
  const location = useLocation();

  // Define the paths where you want the Landing Navbar
  const landingPaths = ["/", "/signup", "/login", "/about", "/contact", "/faq"];
  const isLandingPage = landingPaths.includes(location.pathname);
  const authPaths = ["/login", "/signup"];
  const isAuthPage = authPaths.includes(location.pathname);

  return (
    <AuthWrapper {...authWrapperProps}>
      <div className="app-shell">
        <AmbientOrbs />
        <div className="app-surface">
          {/* Conditional Navbar Rendering */}
          {!isAuthPage && isLandingPage && <NavbarLanding />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Doctor Dashboard — ROUTING FIX: Removed NURSE from allowedRoles.
                Nurses now have their own dedicated dashboard below.
                See: docs/learning/04-spa-routing-patterns.md */}
            <Route
              path="/dashboard/doctor"
              element={
                <ProtectedRoute
                  allowedRoles={["DOCTOR", "ADMIN", "SUPER_ADMIN"]}
                >
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            {/* NEW: Nurse Dashboard — previously nurses shared the Doctor Dashboard.
                Each role should have its own tailored view. */}
            <Route
              path="/dashboard/nurse"
              element={
                <ProtectedRoute
                  allowedRoles={["NURSE", "ADMIN", "SUPER_ADMIN"]}
                >
                  <NurseDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/patient"
              element={
                <ProtectedRoute allowedRoles={["PATIENT"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN", "MANAGEMENT"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/management"
              element={
                <ProtectedRoute allowedRoles={["MANAGEMENT"]}>
                  <ManagementDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/receptionist"
              element={
                <ProtectedRoute allowedRoles={["RECEPTIONIST", "ADMIN", "SUPER_ADMIN"]}>
                  <ReceptionistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/pharmacist"
              element={
                <ProtectedRoute allowedRoles={["PHARMACIST", "ADMIN", "SUPER_ADMIN"]}>
                  <PharmacistDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/labtechnician"
              element={
                <ProtectedRoute allowedRoles={["LAB_TECHNICIAN", "ADMIN", "SUPER_ADMIN"]}>
                  <LabTechnicianDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/billingstaff"
              element={
                <ProtectedRoute allowedRoles={["BILLING_STAFF", "ADMIN", "SUPER_ADMIN"]}>
                  <BillingStaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={
                <div className="text-center p-16">
                  <h1 className="text-2xl font-bold text-red-600">
                    Access Denied
                  </h1>
                  <p>You do not have permission to view this page.</p>
                </div>
              }
            />
            {/* 404 CATCH-ALL ROUTE — Must be LAST in the Routes list.
                The path="*" wildcard matches any URL that wasn't matched above.
                Without this, users visiting /dashboard/typo see a blank page.
                See: docs/learning/04-spa-routing-patterns.md */}
            <Route
              path="*"
              element={
                <div className="text-center p-16">
                  <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                  <h2 className="text-xl font-semibold text-gray-100 mb-2">
                    Page Not Found
                  </h2>
                  <p className="text-gray-400 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                  </p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Go Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default App;