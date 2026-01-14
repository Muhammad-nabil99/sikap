import useGetUser from "@/features/user/useGetUser";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingDashboard from "./LoadingWebsite";

function ProtectedRoutes({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoadingUser } = useGetUser();

  useEffect(() => {
    if (isLoadingUser) return;

    if (!user?.data && isLoadingUser) {
      navigate("/login");
    }

    if (pathname === "/login" && user?.data) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoadingUser, navigate, pathname]);

  if (isLoadingUser) return <LoadingDashboard />;

  return children;
}

export default ProtectedRoutes;
