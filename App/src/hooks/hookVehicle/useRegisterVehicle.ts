import { useCallback, useState } from "react";

import http from "@/src/service/httpAxios";

import { useForm } from "react-hook-form";
import { useAuth } from "@/src/context/AuthContext";

interface Vehicle {
    marca: string;
    modelo: string;
    placa: string;
    anoFabricacao: string;
    quilometragem: string;
    capacidade: string;
    imagemVeiculo_id: string;
}

function useRegisterVehicle() {

    const { userId } = useAuth();
    const { control, handleSubmit, formState: { errors }, watch } = useForm<Vehicle>({ mode: "onSubmit", });


    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState("");
    const [successVisible, setSuccessVisible] = useState(false);

    const handleEditar = useCallback(
        async (data: Vehicle) => {
            try {
                await http.post(`/usuario/${userId}/veiculo`, {
                    marca: data.marca,
                    modelo: data.modelo,
                    placa: data.placa,
                    anoFabricacao: data.anoFabricacao,
                    quilometragem: data.quilometragem,
                    capacidade: data.capacidade,
                    imagemVeiculo_id: data.imagemVeiculo_id,
                });

                setSuccess(true);
                setNotification("Veículo cadastrado com sucesso!");
                setSuccessVisible(true);
            } catch (error) {
                setSuccess(false);
                setNotification("Erro ao Cadastra o veiculo");
                setSuccessVisible(true);
            }
        }, []);

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
        watch
    };
}


export default useRegisterVehicle;