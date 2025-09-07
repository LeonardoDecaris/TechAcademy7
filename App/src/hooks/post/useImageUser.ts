import * as ImagePicker from "expo-image-picker";
import http from "@/src/service/httpAxios";
import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { Alert } from "react-native";

interface UseImageUserReturn {
  loading: boolean;
  statusSuccess: boolean | null;
  error: string | null; // Novo: estado para a mensagem de erro
  uploadImage: (uri: string) => Promise<number | null>;
  pickImage: () => Promise<number | null>; // Alterado: agora retorna o ID da imagem
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

function useImageUser(): UseImageUserReturn {
  const [loading, setLoading] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null); 

  const uploadImage = async (uri: string): Promise<number | null> => {
    setLoading(true);
    setStatusSuccess(null);
    setError(null); 
    try {
      const imageData = createImageFormData(uri);
      const formData = new FormData();
      formData.append("imgUrl", imageData as any);

      const response = await http.post<{ id_imagem: number }>("imgUsuario", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusSuccess(true);
      return response.data.id_imagem;

    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;

      const errorMessage = axiosError.response?.data?.message || "Erro ao enviar imagem.";
      console.error("Erro ao enviar imagem:", axiosError.response?.data || axiosError);
      setError(errorMessage); 
      setStatusSuccess(false);
      return null;
    } finally {
      setLoading(false); 
    }
  };

  const pickImage = async (): Promise<number | null> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "É preciso permitir o acesso à galeria para selecionar uma imagem.");
      setError("Permissão de acesso à galeria negada.");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      return await uploadImage(result.assets[0].uri); 
    }
    
    return null; 
  };

  const resetStatus = useCallback(() => {
    setStatusSuccess(null);
    setError(null);
  }, []);

  return { 
    uploadImage,
    pickImage,
    loading, 
    statusSuccess,
    error, 
    resetStatus, 
  };
};

export default useImageUser;