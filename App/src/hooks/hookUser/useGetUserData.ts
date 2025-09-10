import { useState, useCallback, useMemo } from "react";

import http from "@/src/service/httpAxios";
import { useAuth } from "@/src/context/AuthContext";
import { getInitials, getDisplayName } from "@/src/utils/funcoes";

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

  const [mensage, setMensage] = useState("");
	const [success, setSuccess] = useState(false);
	const [successVisible, setSuccessVisible] = useState(false);

  const getUserData = useCallback(async () => {
    if (!userId) {
      throw new Error("User ID is not available");
    }

    setUserData(undefined);
    setMensage("");
    setSuccess(false);
    setSuccessVisible(false);

    const TIMEOUT_MS = 10000;

    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT")), TIMEOUT_MS)
      );
      const requestPromise = http.get<User>(`usuario/${userId}`);
      const { data } = await Promise.race([requestPromise, timeoutPromise]);
      setUserData(data);
    } catch (error: any) {
      if (error?.message === "TIMEOUT") {
        setMensage("Tempo excedido ao buscar dados do usuário.");
      } else {
        setMensage("Erro ao buscar dados do usuário.");
      }
      setSuccess(false);
      setSuccessVisible(true);
    }
    
  }, [userId]);

  const closeSuccessNotification = useCallback(() => {
		setSuccessVisible(false);
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
    mensage,
    success,
    successVisible,
    closeSuccessNotification,
  };
}

export default useGetUserData;