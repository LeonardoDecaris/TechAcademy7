import { useCallback, useState } from "react";

import http from "@/src/service/httpAxios";

import { set, useForm } from "react-hook-form";
import { useAuth } from "@/src/context/AuthContext";

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
    const { control, handleSubmit,setValue, formState: { errors }, watch } = useForm<Vehicle>({ mode: "onSubmit", });
    const navigation = useNavigation<NavigationProp>();

    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState("");
    const [successVisible, setSuccessVisible] = useState(false);

    const handleNavigation = { profile: () => navigation.navigate('MainTabs', { screen: 'Profile' }) }

    const handleEditar = useCallback(
        async (data: Vehicle) => {
            console.log("data.imagemVeiculo_id:", data.imagemVeiculo_id);
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

                setSuccess(true);
                setNotification("Veículo cadastrado com sucesso!");
                setSuccessVisible(true);

                setTimeout(() => {
                    handleNavigation.profile();
                }, 800);
            } catch (error) {
                setSuccess(false);
                setNotification("Erro ao Cadastra o veiculo");
                setSuccessVisible(true);
            }
        }, []);

    const closeSuccessNotification = () => {
        setSuccessVisible(false);
    }

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
        success,
        notification,  
        successVisible,
        errors,
        setValue,
        closeSuccessNotification,
        watch
    };
}


export default useRegisterVehicle;