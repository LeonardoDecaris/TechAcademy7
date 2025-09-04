
import * as ImagePicker from "expo-image-picker";
import http from "@/src/service/httpAxios";
import { useState } from "react";

interface UseImageUserReturn {
  loading: boolean;
  statusSuccess: boolean | null;
  uploadImage: (uri: string) => Promise<number | null>;
  pickImage: () => Promise<void>;
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

  const uploadImage = async (uri: string): Promise<number | null> => {
    setLoading(true);
    setStatusSuccess(null);
    try {
      const imageData = createImageFormData(uri);
      const formData = new FormData();
      formData.append("imgUrl", imageData as any);

      const response = await http.post("imgUsuario", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatusSuccess(true);
      setLoading(false);
      return response.data.id_imagem;

    } catch (error) {
      console.log("Erro ao enviar imagem:", error);
      setStatusSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (): Promise<void> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
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

  return { 
    uploadImage,
    pickImage,
    loading, 
    statusSuccess 
  };
};

export default useImageUser;