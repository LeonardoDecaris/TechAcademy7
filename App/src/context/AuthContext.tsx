import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode"; 

interface TokenPayload {
    id_usuario: string;
    nome: string;
    user?: {
        id_usuario: string;
        nome: string;
    }
}

interface AuthContextType {
  token: string | null;
  userId: string | null;
  userName: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>; 
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeToken = (token: string): Omit<TokenPayload, 'user'> | null => {
    try {
        const decoded: TokenPayload = jwtDecode(token);
        return decoded.user ?? decoded;
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
      if (storedToken) {
        const userData = decodeToken(storedToken);
        if (userData) {
            setToken(storedToken);
            setUserId(userData.id_usuario);
            setUserName(userData.nome);
        }
      }
    };
    loadAuthData();
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync("authToken", token);
    const userData = decodeToken(token);
    if (userData) {
      setUserId(userData.id_usuario);
      setUserName(userData.nome);
    }
    setToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
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