import { useState, useCallback } from "react";

import { AxiosError } from "axios";
import { Alert } from "react-native";

import http from "@/src/service/httpAxios";
import * as ImagePicker from "expo-image-picker";
import { trataFormData } from "@/src/utils/trataFormData";

interface responseImage {
    loading: boolean;
    errorImage: string | null;
    statusSuccess: boolean | null;
    
    resetStatus: () => void;
    pickImage: () => Promise<number | null>;
    uploadImage: (uri: string) => Promise<number | null>;
}

function useImagemVehicle(): responseImage {

    const [loading, setLoading] = useState(false);
    const [statusSuccess, setStatusSuccess] = useState<boolean | null>(null);
    const [errorImage, setErrorImage] = useState<string | null>(null);

    const uploadImage = async (uri: string): Promise<number | null> => {

        setErrorImage(null);
        setLoading(true);
        setStatusSuccess(null);

        try {
            const formData = new FormData();
            const imageData = trataFormData(uri);
            formData.append("imgUrl", imageData as any);

            const response = await http.post<{ id_imagemVeiculo: number }>("imgCaminhao", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setStatusSuccess(true);
            return response.data.id_imagemVeiculo;

        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            setErrorImage(axiosError.response?.data?.message || "Erro ao enviar imagem.");
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
            setErrorImage("Permissão de acesso à galeria negada.");
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets?.length) {
            return await uploadImage(result.assets[0].uri);
        }

        return null;
    };

    const resetStatus = useCallback(() => {
        setStatusSuccess(null);
        setErrorImage(null);
    }, []);

    return {
        uploadImage,
        pickImage,
        loading,
        statusSuccess,
        errorImage,
        resetStatus,
    };
};

export default useImagemVehicle;