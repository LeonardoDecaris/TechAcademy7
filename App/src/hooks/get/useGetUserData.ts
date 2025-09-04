import { useState, useCallback, useMemo, useEffect } from "react";

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

  const getUserData = useCallback(async () => {
    if (!userId) {
      throw new Error("User ID is not available");
    }

    try {
      const { data } = await http.get<User>(`usuario/${userId}`);
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw new Error("Unable to fetch user data");
    }
  }, [userId]);

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
  };
}

export default useGetUserData;