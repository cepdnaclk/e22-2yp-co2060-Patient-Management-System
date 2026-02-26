import Signup from "./features/auth/Signup.jsx";
import Login from "./features/auth/Login.jsx";
import "./App.css";
import Home from "./pages/Home.jsx";
import DoctorDashboard from "./features/dashboard/DoctorDashboard.jsx";
import AdminDashboard from "./features/dashboard/AdminDashboard.jsx";
import PatientDashboard from "./features/dashboard/PatientDashboard.jsx";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./features/auth/ProtectedRoute.jsx";
import Dashboard from "./features/dashboard/DoctorDashboardComponents/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard/doctor"
        element={
          <ProtectedRoute
            allowedRoles={["DOCTOR", "NURSE", "ADMIN", "SUPER_ADMIN"]}
          >
            <DoctorDashboard />
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
        path="/unauthorized"
        element={
          <div className="text-center p-16">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p>You do not have permission to view this page.</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
