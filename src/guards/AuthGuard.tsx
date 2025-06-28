import { Navigate } from "react-router";
import { useAuth } from "../context/UserContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return <>{isAuthenticated ? children : <Navigate to="/" />}</>;
};

export default AuthGuard