import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { authService } from "../../services/authService";

// Role-based redirect configuration
const ROLE_ROUTES = {
  SUPER_ADMIN: "/dashboard/superadimin",
  ADMIN: "/dashboard/admin",
  DOCTOR: "/dashboard/doctor",
  NURSE: "/dashboardnurse",
  RECEPTIONIST: "/dashboard/receptionist",
  BILLING_STAFF: "/dashboard/billingstaff",
  PHARMACIST: "/dashboard/pharmacist",
  LAB_TECHNICIAN: "/dashboard/labtechnicians",
  PATIENT: "/dashboard/patient",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { saveLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
    setLoading(true);
    setError("");

    try {
      // Logic using your authService
      const data = await authService.login(email, password);

      // Save to context (and localStorage via service)
      saveLogin(data.token, data.user);

      // Redirect based on user role
      const redirectPath = ROLE_ROUTES[data.user.role] || "/dashboard";
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-r from-blue-800 to-blue-400 min-h-screen">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          {/* Left Side: Branding */}
          <div className="max-w-lg max-md:mx-auto max-md:text-center">
            <h1 className="text-4xl font-semibold leading-tight text-white">
              Secure Your Health
            </h1>
            <p className="text-[15px] mt-12 text-white">
              Don't have an account?
              <NavLink
                to="/signup"
                className="text-white underline font-semibold ml-1"
              >
                Register here
              </NavLink>
            </p>
          </div>

          {/* Right Side: Login Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl px-8 py-12 max-w-md md:ml-auto max-md:mx-auto w-full shadow-2xl"
          >
            <h2 className="text-slate-900 text-3xl font-bold mb-8">Sign in</h2>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3 rounded-md outline-blue-600 transition-all"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3 rounded-md outline-blue-600 transition-all"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-sm text-right">
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full shadow-xl py-2.5 px-6 text-[15px] font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none cursor-pointer transition-all disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <p className="my-6 text-sm text-slate-600 text-center">
              or continue with
            </p>

            <div className="flex justify-center">
              <button
                type="button"
                className="border-0 outline-none cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <img
                  src="/google-48.png"
                  alt="Google Login"
                  className="w-7 h-7"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
