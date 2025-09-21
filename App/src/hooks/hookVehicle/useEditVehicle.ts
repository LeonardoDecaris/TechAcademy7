import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import http from "@/src/service/httpAxios";
import type { AxiosError } from "axios";

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface EditVehicleFormData {
    marca: string;
    modelo: string;
    placa: string;
    ano?: string;
    quilometragem?: string;
    capacidade?: string;
}

function useEditVehicle(id: number, imagemVeiculo_id: number) {

    const navigation = useNavigation<NavigationProp>();

    const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm<EditVehicleFormData>({ mode: "onSubmit" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [status, setStatus] = useState<"success" | "error" | "loading">("success");

    const closeNotification = useCallback(() => {
        setNotificationVisible(false);
        if (status === "success") {
            navigation.navigate("MyVehicle");
        }
    }, [navigation, status]);

    const handleEditar = useCallback(async (data: EditVehicleFormData) => {
        setLoading(true);
        setStatus("loading");
        setMessage("Atualizando dados...");
        setNotificationVisible(true);

        try {
            await http.put(`veiculo/${id}`, {
                marca: data.marca,
                modelo: data.modelo,
                placa: data.placa,
                ano: data.ano,
                quilometragem: data.quilometragem,
                capacidade: data.capacidade,
                imagemVeiculo_id: imagemVeiculo_id
            });

            setNotificationVisible(false);
            setTimeout(() => {
                setStatus("success");
                setMessage("Veículo atualizado com sucesso.");
                setNotificationVisible(true);
            }, 300);

        } catch (err) {
            const error = err as AxiosError<{ errors?: Record<string, string>; message?: string }>;
            console.error("Erro ao atualizar veículo:", error);

            setNotificationVisible(false);
            setTimeout(() => {
                setStatus("error");
                const serverMessage = error.response?.data?.message;
                setMessage(serverMessage || "Erro ao atualizar veículo.");
                setNotificationVisible(true);

                const fieldErrors = error.response?.data?.errors;
                if (fieldErrors && typeof fieldErrors === "object") {
                    Object.entries(fieldErrors).forEach(([field, msg]) => {
                        setError(field as keyof EditVehicleFormData, {
                            type: "server",
                            message: String(msg),
                        });
                    });
                }
            }, 300);
        } finally {
            setLoading(false);
        }
    }, [id, imagemVeiculo_id, setError]);

    const rules = {
        marca: { required: 'Marca é obrigatória' },
        modelo: { required: 'Modelo é obrigatório' },
        placa: { required: 'Placa é obrigatória', maxLength: { value: 8, message: 'Placa inválida' } },
        ano: { required: 'Ano obrigatório', minLength: { value: 4, message: 'Ano inválido' } },
        quilometragem: { required: 'Quilometragem obrigatória' },
        capacidade: { required: 'Capacidade obrigatória' },
    };


    return {
        rules,
        errors,
        control,
        loading,
        status,
        message,
        setValue,
        handleEditar,
        handleSubmit,
        notificationVisible,
        closeNotification,
    };
}


export default useEditVehicle;