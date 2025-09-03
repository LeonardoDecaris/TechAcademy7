import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import http from "@/src/service/httpAxios";

type UseImageUserReturn = {
  loading: boolean;
  error: string | null;
  success: boolean;
  uploadImage: (uri: string) => Promise<number | null>;
  pickImage: () => Promise<void>;
};

const useImageUser = (): UseImageUserReturn => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const uploadImage = async (uri: string): Promise<number | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const filename = uri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("imgUrl", {
        uri,
        name: filename,
        type,
      } as any);

      console.log("Uploading image to:", `${http.defaults.baseURL}/imgUsuario`);
      console.log("FormData:", formData);

      const response = await http.post("imgUsuario", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", response.data);
      setSuccess(true);
      return response.data.id_imagem; // Return id_imagem
    } catch (err: any) {
      console.error("Erro ao enviar imagem:", err);
      if (err.message === "Network Error") {
        setError("Falha na conexão com o servidor. Verifique se o servidor está ativo e a URL está correta.");
      } else {
        setError(err?.response?.data?.message || "Erro ao enviar imagem");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (): Promise<void> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setError("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      await uploadImage(result.assets[0].uri); 
    }
  };

  return { loading, error, success, uploadImage, pickImage };
};

export default useImageUser;