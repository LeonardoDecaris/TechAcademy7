import { useState, useCallback, useMemo } from "react";

import http from "@/src/service/httpAxios";
import { useAuth } from "@/src/context/AuthContext";
import { getInitials, getDisplayName } from "@/src/utils/funcoes";
import { AxiosError } from "axios";

interface UserImage {
  id_imagem: number;
  imgUrl: string;
}

interface User {
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  imagemUsuario_id: number | null;
  imagemUsuario: UserImage | null;
}

/**
 * Custom hook to fetch and manage user data.
 * @returns An object containing user data, initials, display name, and a function to fetch user data.
 */
function useGetUserData() {
  const { userId } = useAuth();
  const [userData, setUserData] = useState<User>();

  const [status, setStatus] = useState<"success" | "error" | "loading">("success");
  const [message, setMessage] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserData = useCallback(async () => {
    if (!userId) {
      console.error("User ID is not available for getUserData");
      return;
    }

    setLoading(true);
    setStatus("loading");
    setMessage("Carregando dados...");
    setNotificationVisible(true);

    try {
      const { data } = await http.get<User>(`usuario/${userId}`);
      setUserData(data);

      setNotificationVisible(false);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Erro ao buscar dados do usuário:", error);

      setNotificationVisible(false);
      setTimeout(() => {
        setStatus("error");
        setMessage("Erro ao carregar dados do usuário.");
        setNotificationVisible(true);
      }, 300);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const closeNotification = useCallback(() => {
    setNotificationVisible(false);
  }, []);

  const iniciasNomeUsuario = useMemo(
    () => getInitials(userData?.nome ?? ""),
    [userData?.nome]
  );

  const nomeAbreviado = useMemo(
    () => getDisplayName(userData?.nome ?? ""),
    [userData?.nome]
  );

  return {
    userData,
    iniciasNomeUsuario,
    nomeAbreviado,
    getUserData,
    loading,
    status,
    message,
    notificationVisible,
    closeNotification,
  };
}

export default useGetUserData;