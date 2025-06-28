import { createContext, useContext, useState } from "react";
import type { User } from "../interfaces/userInterface";

interface AuthContextType {
  user: User;
  token: string;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [token, setToken] = useState<string>('')
  const [isAuthenticated, setIsAuth] = useState<boolean>(false);
  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    setIsAuth(true);
  };

  const logout = () => {
    setUser({} as User);
    setToken('')
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};