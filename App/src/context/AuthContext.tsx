import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import * as Keychain from "react-native-keychain";

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
    const loadStorageData = async () => {
      try {
        const credentials = await Keychain.getGenericPassword({ service: "authToken" });
        const userIdCredentials = await Keychain.getGenericPassword({ service: "userId" });
        const userNameCredentials = await Keychain.getGenericPassword({ service: "userName" });

        if (credentials) {
          setToken(credentials.password);
          setUserId(userIdCredentials ? userIdCredentials.password : null);
          setUserName(userNameCredentials ? userNameCredentials.password : null);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Keychain:", error);
      }
    };

    loadStorageData();
  }, []);

  const login = async (token: string) => {
    try {
      await Keychain.setGenericPassword("authToken", token, { service: "authToken" });
      const userData = decodeToken(token);
      if (userData) {
        await Keychain.setGenericPassword("userId", userData.id || "", { service: "userId" });
        await Keychain.setGenericPassword("userName", userData.name || "", { service: "userName" });
        setUserId(userData.id || null);
        setUserName(userData.name || null);
      }
      setToken(token);
    } catch (error) {
      console.error("Erro ao salvar dados no Keychain:", error);
    }
  };

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword({ service: "authToken" });
      await Keychain.resetGenericPassword({ service: "userId" });
      await Keychain.resetGenericPassword({ service: "userName" });
      setToken(null);
      setUserId(null);
      setUserName(null);
    } catch (error) {
      console.error("Erro ao remover dados do Keychain:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, userName, login, logout, isAuthenticated: !!token }}
    >
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