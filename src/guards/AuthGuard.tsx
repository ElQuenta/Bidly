import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAuthStore((state)=>state.isAuth)
  return <>{isAuth ? children : <Navigate to="/" />}</>;
};

export default AuthGuard