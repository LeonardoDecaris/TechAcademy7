import { useState, useCallback } from "react";

import http from "@/src/service/httpAxios";
import { frete } from "@/src/interface/interfaceFreight";

/**
 * Custom hook to fetch and manage freight data.
 * @returns An object containing freight data, loading state, message, success flags, and utility functions.
 */
function useFreight() {

  const [freightData, setFreightData] = useState<frete[]>([]);

  const [mensage, setMensage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const closeSuccessNotification = useCallback(() => {
    setSuccessVisible(false);
  }, []);

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