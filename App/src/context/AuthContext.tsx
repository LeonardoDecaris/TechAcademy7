import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { decode as atob } from "base-64";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  userName: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string) => {
    try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        return payload.user ?? payload;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = await SecureStore.getItemAsync("authToken");
      const storedUserId = await SecureStore.getItemAsync("userId");
      const storedUserName = await SecureStore.getItemAsync("userName");
      setToken(storedToken);
      setUserId(storedUserId);
      setUserName(storedUserName);
    };
    loadAuthData();
  }, []);

  const login = (token: string) => {
    SecureStore.setItemAsync("authToken", token);

    const userData = decodeToken(token);
    if (userData) {
      SecureStore.setItemAsync("userId", userData.id_usuario || "");
      SecureStore.setItemAsync("userName", userData.nome || "");
      setUserId(userData.id_usuario || null);
      setUserName(userData.nome || null);
    }
    setToken(token);
  };
  
  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("userName");
    setToken(null);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, userName, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth needs to be inside the AuthProvider");
    }
    return context;
};