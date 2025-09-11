import { useState, useCallback } from "react";

import http from "@/src/service/httpAxios";

interface imagemEmpresa {
  id_imagem: number;
  imgUrl: string;
}

interface empresa {
  id_empresa: number;
  nome: string;
  tipo: string;
  avaliacao: number;
  localizacao: string;
  imagemEmpresa_id: number;

  imagemEmpresa: imagemEmpresa;
}

interface imagemCarga {
  id_imagem: number;
  imgUrl: string;
}

interface carga {
  id_carga: number;
  nome: string;
  descricao: string;
  peso: string;
  imagemCarga_id: number;

  imagemCarga: imagemCarga;
}

interface status {
  id_status: number;
  nome: string;
}

interface caminhoneiro {
  id_caminhoneiro: number;
  usuario_id: number;
  veiculo_id: number;
}

interface frete {
  id_frete: number;
  saida: string;
  destino: string;
  valor_frete: string;
  prazo: string;

  carga_id: number;
  status_id: number;
  empresa_id: number;
  caminhoneiro_id: number | null;

  carga: carga;
  status: status;
  empresa: empresa;
  caminhoneiro: caminhoneiro | null;
}

/**
 * Custom hook to fetch and manage user data.
 * @returns An object containing user data, initials, display name, and a function to fetch user data.
 */
function useFreight() {

  const [freightData, setFreightData] = useState<frete[]>([]);

  const [mensage, setMensage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const getFreightDado = useCallback(async () => {

    setMensage("");
    setSuccess(false);
    setIsLoading(true);
    setSuccessVisible(false);

    try {
      const { data } = await http.get("frete");
      setFreightData(data);
    } catch (error) {
      console.error(error);
      setMensage("Erro ao buscar dados de frete.");
      setSuccess(false);
      setSuccessVisible(true);
    } finally {
      setIsLoading(false);
    }

  }, []);

  const closeSuccessNotification = useCallback(() => {
    setSuccessVisible(false);
  }, []);

  return {
    freightData,
    isLoading,
    getFreightDado,
    mensage,
    success,
    successVisible,
    closeSuccessNotification,
  };
}

export default useFreight;