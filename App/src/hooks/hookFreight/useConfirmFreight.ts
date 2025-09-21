import { useCallback, useState } from "react";
import http from "../../service/httpAxios";

import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * @returns função para confirmar o frete
 */
function useConfirmFreight() {
    
    const navigation = useNavigation<NavigationProp>();

    const [mensage, setMensage] = useState("");
    const [success, setSuccess] = useState("");
    const [successVisible, setSuccessVisible] = useState(false);

    const handleNavigation = { profile: () => navigation.navigate('MainTabs', { screen: 'Home' }) };

    const closeSuccessNotification = useCallback(() => {
        setSuccessVisible(false);
        if (success === "success") {
            handleNavigation.profile();
        }
    }, [success]);

    const confirmFreight = useCallback(async (id: string, idCaminhoneiro?: number) => {
        setSuccess("loading");
        setMensage("Confirmando frete");
        setSuccessVisible(true);
        
        if (!idCaminhoneiro) {
            throw new Error("Caminhoneiro ID is required");
        }

        try {
            await http.put(`/frete/${id}`, {
                caminhoneiro_id: idCaminhoneiro,
            });

            setSuccessVisible(false);
            setTimeout(() => {
                setSuccess("success");
                setMensage("Frete confirmado com sucesso");
                setSuccessVisible(true);
            }, 300);

        } catch (error) {
            console.log(error);
            setSuccessVisible(false);
            setTimeout(() => {
                setSuccess("error");
                setMensage("Erro ao confirmar frete, tente novamente");
                setSuccessVisible(true);
            }, 300);
        }
    }, []);

    return {
        confirmFreight,
        mensage,
        success,
        successVisible,
        closeSuccessNotification,
    }
}

export default useConfirmFreight;