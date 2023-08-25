import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout(): void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("jwt")
  );
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("jwt", token);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
