import useGetUser from "@/features/user/useGetUser";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingDashboard from "./LoadingWebsite";

function ProtectedRoutes({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoadingUser } = useGetUser();
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token && (user?.data || user));

  useEffect(() => {
    if (isLoadingUser) return;

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }

    if (pathname === "/login" && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoadingUser, navigate, pathname]);

  if (!token) return <Navigate to="/login" replace />;

  if (isLoadingUser) return <LoadingDashboard />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoutes;
