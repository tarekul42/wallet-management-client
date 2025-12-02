import { useAppSelector } from "@/redux/hook";
import { Navigate } from "react-router";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { token } = useAppSelector((state) => state.auth);

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
