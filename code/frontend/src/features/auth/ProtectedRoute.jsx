// src/features/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoggedIn } = useAuth();

  // Not logged in → redirect to login
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // Logged in but role not allowed → redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// ── How to use in App.jsx ────────────────────────────────────────
// Any logged-in user:
// <ProtectedRoute><Dashboard /></ProtectedRoute>

// Doctors and admins only:
// <ProtectedRoute allowedRoles={['DOCTOR','ADMIN','SUPER_ADMIN']}>
//     <PatientList />
// </ProtectedRoute>

// IMPORTANT: This only hides pages in the UI.
// Real security is @PreAuthorize on the backend.
// Always enforce roles on the backend — never trust the frontend alone.
