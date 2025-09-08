import http from "@/src/service/httpAxios";
import { useState, useCallback } from "react";
import { AxiosError } from "axios";

interface UseEditImageUserReturn {
  loadingUpdate: boolean;
  statusSuccessUpdate: boolean | null;
  errorUpdate: string | null; // Novo: estado para a mensagem de erro
  updateImage: (id: string, uri: string) => Promise<void>;
  resetStatus: () => void; // Novo: função para resetar o estado
}

interface ImageFormData {
  uri: string;
  name: string;
  type: string;
}

const createImageFormData = (uri: string): ImageFormData => {
  const nome = uri.split("/").pop() || "image.jpg";
  const match = /\.(\w+)$/.exec(nome);
  const type = match ? `image/${match[1]}` : `image`;
  return { uri, name: nome, type };
};

function useEditImageUser(): UseEditImageUserReturn {

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [statusSuccessUpdate, setStatusSuccessUpdate] = useState<boolean | null>(null);
  const [errorUpdate, setErrorUpdate] = useState<string | null>(null); // Novo estado

  const updateImage = async (id: string, uri: string): Promise<void> => {
    setLoadingUpdate(true);
    setStatusSuccessUpdate(null);
    setErrorUpdate(null); 
    
    try {
      const imageData = createImageFormData(uri);
      const formData = new FormData();
      
      formData.append("imgUrl", imageData as any);

      await http.put(`imgUsuario/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusSuccessUpdate(true);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage = error.response?.data?.message || "Erro ao atualizar imagem. Tente novamente.";
      console.error("Erro ao atualizar imagem:", error.response?.data || error);
      setErrorUpdate(errorMessage); // Armazena a mensagem de erro
      setStatusSuccessUpdate(false);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const resetStatus = useCallback(() => {
    setStatusSuccessUpdate(null);
    setErrorUpdate(null);
  }, []);

  return { updateImage, loadingUpdate, statusSuccessUpdate, errorUpdate, resetStatus };
}

export default useEditImageUser;