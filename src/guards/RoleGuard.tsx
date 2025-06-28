import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/UserContext";

const RoleGuard = () => {
  const { user } = useAuth()
  return <>{user.role === 'admin' ? Outlet : (Navigate({ to: '/', replace: true }))}</>
};

export default RoleGuard;