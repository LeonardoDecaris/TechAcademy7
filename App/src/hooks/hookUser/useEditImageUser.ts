import http from "@/src/service/httpAxios";
import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { trataFormData } from "@/src/utils/trataFormData";

interface UseEditImageUserReturn {
  loadingUpdate: boolean;
  statusSuccessUpdate: boolean | null;
  errorUpdate: string | null;
  updateImage: (id: string, uri: string) => Promise<void>;
  resetStatus: () => void;
}



function useEditImageUser(): UseEditImageUserReturn {

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [statusSuccessUpdate, setStatusSuccessUpdate] = useState<boolean | null>(null);
  const [errorUpdate, setErrorUpdate] = useState<string | null>(null);

  const updateImage = async (id: string, uri: string): Promise<void> => {
    setLoadingUpdate(true);
    setStatusSuccessUpdate(null);
    setErrorUpdate(null); 
    
    try {
      const imageData = trataFormData(uri);
      const formData = new FormData();
      
      formData.append("imgUrl", imageData as any);

      await http.put(`imgUsuario/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusSuccessUpdate(true);
    } catch (err) {
      setErrorUpdate("erro ao editar a imagem"); 
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