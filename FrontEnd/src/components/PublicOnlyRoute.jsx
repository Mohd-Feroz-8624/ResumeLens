import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import API_URL from "../utils/api";

const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isValidating, setIsValidating] = useState(!!token);
  const [hasValidToken, setHasValidToken] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsValidating(false);
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
          setHasValidToken(true);
        } else {
          // Token is stale or invalid, clear it
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
        }
      } catch (err) {
        console.error("Verification error on public route:", err);
      } finally {
        setIsValidating(false);
      }
    };

    verifyUser();
  }, [token]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
          <p className="text-gray-400 text-sm font-semibold">Checking session...</p>
        </div>
      </div>
    );
  }

  if (token && hasValidToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
