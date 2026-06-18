import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import API_URL from "../utils/api";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isValid, setIsValid] = useState(null); // null = loading, true = valid, false = invalid

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    const verifyUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          setIsValid(true);
        } else {
          // Token is invalid, expired, or user not found in MongoDB
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          setIsValid(false);
        }
      } catch (err) {
        console.error("User validation error:", err);
        // On network error, we don't want to lock them out immediately if they have a token,
        // but since we want to strictly check existence in MongoDB, we default to invalid.
        setIsValid(false);
      }
    };

    verifyUser();
  }, [token]);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
          <p className="text-gray-400 text-sm font-semibold">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (isValid === false) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
