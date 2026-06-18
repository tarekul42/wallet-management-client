import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAppDispatch } from "@/redux/hook";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { decodedToken } from "@/utils/jwt";
import { Skeleton } from "@/components/ui/skeleton";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const processed = useRef(false);

  const token = searchParams.get("token");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    if (token) {
      try {
        const user = decodedToken(token);
        dispatch(setCredentials({ token, user }));
        localStorage.setItem("token", token);
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        navigate("/dashboard", { replace: true });
      } catch {
        navigate("/login?error=auth_failed", { replace: true });
      }
    } else {
      navigate("/login?error=auth_failed", { replace: true });
    }
  }, [token, refreshToken, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-12 rounded-full mx-auto" />
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
