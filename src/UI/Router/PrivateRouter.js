import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../common/components/LoadingSpinner";
import { routes } from "../common/routes";
import { useAuthStore } from "../store/Auth";

const PrivateRouter = () => {
  const [{ authLoader, isAuthenticated }, { checkAuthenticate }] =
    useAuthStore();
  const { pathname } = useLocation();

  useEffect(() => {
    checkAuthenticate();
  }, [checkAuthenticate, pathname]);

  if (authLoader)
    return <LoadingSpinner tip="Authenticating" isFullPage={true} />;
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.LOGIN} />;
};

export default PrivateRouter;
