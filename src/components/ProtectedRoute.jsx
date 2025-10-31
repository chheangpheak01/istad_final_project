import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    // Get token from localStorage
    const token = localStorage.getItem("moviehubToken");
    // If no token → redirect to SignIn
    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }
    return children;
}
