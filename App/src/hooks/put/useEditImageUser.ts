import http from "@/src/service/httpAxios";
import { useState } from "react";

interface UseEditImageUserReturn {
  loadingUpdate: boolean;
  statusSuccessUpdate: boolean | null;
  updateImage: (id: string, uri: string) => Promise<void>;
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

  const updateImage = async (id: string, uri: string): Promise<void> => {
    setLoadingUpdate(true);
    setStatusSuccessUpdate(null);
    
    try {
      const imageData = createImageFormData(uri);
      const formData = new FormData();
      formData.append("imgUrl", imageData as any);

      await http.put(`imgUsuario/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusSuccessUpdate(true);
    } catch (error) {
      console.log("Erro ao atualizar imagem:", error);
      setStatusSuccessUpdate(false);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return { updateImage, loadingUpdate, statusSuccessUpdate };
}

export default useEditImageUser;