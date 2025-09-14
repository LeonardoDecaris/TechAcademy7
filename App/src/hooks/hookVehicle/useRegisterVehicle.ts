import { useCallback, useState } from "react";

import http from "@/src/service/httpAxios";

import { useForm } from "react-hook-form";
import { useAuth } from "@/src/context/AuthContext";

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from "axios";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface Vehicle {
    marca: string;
    modelo: string;
    placa: string;
    anoFabricacao: string;
    quilometragem: string;
    capacidade: string;
    imagemVeiculo_id: number;
}

function useRegisterVehicle() {

    const { userId } = useAuth();
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm<Vehicle>({ mode: "onSubmit", });
    const navigation = useNavigation<NavigationProp>();

    const [status, setStatus] = useState<"success" | "error" | "loading">("success");
    const [message, setMessage] = useState("");
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleNavigation = { profile: () => navigation.navigate('MainTabs', { screen: 'Profile' }) }

    const closeNotification = () => {
        setNotificationVisible(false);
        if (status === "success") {
            handleNavigation.profile();
        }
    }

    const handleEditar = useCallback(
        async (data: Vehicle) => {
            setLoading(true);
            setStatus("loading");
            setMessage("Cadastrando veículo...");
            setNotificationVisible(true);

            try {
                await http.post(`/usuario/${userId}/veiculo`, {
                    marca: data.marca,
                    modelo: data.modelo,
                    placa: data.placa,
                    ano: data.anoFabricacao,
                    capacidade: data.capacidade,
                    quilometragem: data.quilometragem,
                    imagemVeiculo_id: data.imagemVeiculo_id,
                });

                setNotificationVisible(false);
                setTimeout(() => {
                    setStatus("success");
                    setMessage("Veículo cadastrado com sucesso!");
                    setNotificationVisible(true);
                    setTimeout(handleNavigation.profile, 1000);
                }, 300);

            } catch (err) {
                const error = err as AxiosError<{ message?: string }>;
                setNotificationVisible(false);
                setTimeout(() => {
                    setStatus("error");
                    const serverMessage = error.response?.data?.message;
                    setMessage(serverMessage || "Erro ao cadastrar o veículo.");
                    setNotificationVisible(true);
                }, 300);
            } finally {
                setLoading(false);
            }
        }, [userId, handleNavigation.profile]);

    const rules = {
        marca: {
            required: 'Marca é obrigatória',
        },
        modelo: {
            required: 'Modelo é obrigatório',
        },
        placa: {
            required: 'Placa é obrigatória',
        },
        anoFabricacao: {
            required: 'Ano de fabricação é obrigatório',
        },
        quilometragem: {
            required: 'Quilometragem é obrigatória',
        },
        capacidade: {
            required: 'Capacidade é obrigatória',
        },
    };

    return {
        rules,
        control,
        handleSubmit,
        handleEditar,
        status,
        message,
        notificationVisible,
        errors,
        setValue,
        closeNotification,
        watch,
        loading,
    };
}


export default useRegisterVehicle;