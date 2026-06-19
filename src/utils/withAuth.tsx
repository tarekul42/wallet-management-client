import { useAppSelector } from "@/redux/hook";
import { Navigate, useLocation } from "react-router";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { token } = useAppSelector((state) => state.auth);
    const location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
