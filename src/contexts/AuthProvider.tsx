import { useState, useContext, useEffect, createContext } from "react";

import type { AuthProviderProps, DecodedToken } from "../models/auth";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
  token: string | null;
  isAdmin: boolean;
  idUser: number | null;
  getUsername: () => string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number | null>(null);

  useEffect(() => {
    const token = JSON.parse(localStorage?.getItem("token") || "{}");
    if (token && isValidToken(token)) {
      //Si hay accessToken y es valido
      setToken(token);
      setIsLoggedIn(true);
      setIsAdmin(isUserAdmin());
      getUserId();
    } else {
      //Si hay accessToken pero no es valido
      logout();
    }
  }, []);

  //Cada 5 minutos se verifica si el token sigue siendo valido
  setTimeout(() => {
    isValidToken(token || "");
  }, 1000 * 60 * 5);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const isValidToken = (token: string): boolean => {
    if (!token) return false;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getUserId = (): void => {
    if (!token) return;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log(decoded);
      setIdUser(decoded.userId);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const getUsername = (): string => {
    if (!token) return "";
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.username;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const isUserAdmin = (): boolean => {
    if (!token) return false;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.authorities.includes("ROLE_ADMIN");
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logout,
        token,
        isAdmin,
        idUser,
        getUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
