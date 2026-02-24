import Signup from "./features/auth/Signup.jsx";
import Login from "./features/auth/Login.jsx";
import "./App.css";
import Home from "./pages/Home.jsx";
import DoctorDashboard from "./features/dashboard/DoctorDashboard.jsx";
import AdminDashboard from "./features/dashboard/AdminDashboard.jsx";
import PatientDashboard from "./features/dashboard/PatientDashboard.jsx";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/patient" element={<PatientDashboard />} />
    </Routes>
  );
}

export default App;
