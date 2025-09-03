import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import http from "@/src/service/httpAxios";

type UpdateImageResponse = {
  id_imagem: number;
  imgUrl: string;
};

type UseEditImageUserReturn = {
  loading: boolean;
  error: string | null;
  success: boolean;
  updateImage: (id: number | string, uri: string) => Promise<UpdateImageResponse | null>;
  pickAndUpdate: (id: number | string) => Promise<UpdateImageResponse | null>;
};

function useEditImageUser(): UseEditImageUserReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateImage = async (id: number | string, uri: string): Promise<UpdateImageResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const filename = uri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("imgUrl", { uri, name: filename, type } as any);

      const { data } = await http.put<UpdateImageResponse>(`imgUsuario/${id}`, formData);

      setSuccess(true);
      return data;
    } catch (err: any) {
      console.error("Erro ao atualizar imagem:", err);
      setError(err?.response?.data?.message || "Erro ao atualizar imagem");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const pickAndUpdate = async (id: number | string): Promise<UpdateImageResponse | null> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      setError("Permissão para acessar a galeria é necessária!");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      return updateImage(id, result.assets[0].uri);
    }
    return null;
  };

  return { loading, error, success, updateImage, pickAndUpdate };
}

export default useEditImageUser;