import { useState, useCallback, useMemo, useEffect } from "react";

import api from "@/src/service/ApiAxios";
import { useAuth } from "@/src/context/AuthContext";
import { getInitials, getDisplayName } from "@/src/utils/funcoes";

interface UserImage {
  id: number;
  imgUrl: string;
}

interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  imageId: number | null;
  image: UserImage | null;
}

/**
 * Custom hook to fetch and manage user data.
 * @returns An object containing user data, initials, display name, and a function to fetch user data.
 */
function useGetDadosUsuario() {
  const { userId } = useAuth();
  const [dadosUsuario, setDadosUsuario] = useState<User | null>(null);

  const getDadosUsuario = useCallback(async () => {
    if (!userId) {
      throw new Error("User ID is not available");
    }

    try {
      const { data } = await api.get<User>(`/usuario/${userId}`);
      setDadosUsuario(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw new Error("Unable to fetch user data");
    }
  }, [userId]);

  useEffect(() => {
    getDadosUsuario();
  }, [getDadosUsuario]);


  const iniciasNomeUsuario = useMemo(
    () => getInitials(dadosUsuario?.nome ?? ""),
    [dadosUsuario?.nome]
  );


  const nomeAbreviado = useMemo(
    () => getDisplayName(dadosUsuario?.nome ?? ""),
    [dadosUsuario?.nome]
  );

  return {
    dadosUsuario,
    iniciasNomeUsuario,
    nomeAbreviado,
    getDadosUsuario,
  };
}

export default useGetDadosUsuario;