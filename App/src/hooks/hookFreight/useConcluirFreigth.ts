import { useCallback, useState } from "react";
import http from "../../service/httpAxios";

import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function useConcluirFreight() {
    
    const navigation = useNavigation<NavigationProp>();

    const [mensage, setMensage] = useState("");
    const [success, setSuccess] = useState("");
    const [successVisible, setSuccessVisible] = useState(false);

    const handleNavigation = { profile: () => navigation.navigate('MainTabs', { screen: 'Home' }) };

    const closeSuccessNotification = useCallback(() => {
        setSuccessVisible(false);
        if (success === "success") { handleNavigation.profile(); }
    }, [success]);

    const concluirFrete = useCallback(async (id: string,) => {
        setSuccess("loading");
        setMensage("Confirmando frete");
        setSuccessVisible(true);

        try {
            await http.put(`/frete/${id}`, {
                status_id: 5,
                caminhoneiro_id: null,
                data_chegada: new Date().toISOString(),
            });

            setSuccessVisible(false);
            setTimeout(() => {
                setSuccess("loading");
                setMensage("concluindo frete aguarde...");
                setSuccessVisible(true);
            }, 300);
            
            setTimeout(() => {
                setSuccess("success");
                setMensage("Entrega concluída com sucesso");
                setSuccessVisible(true);
            }, 300);

        } catch (error) {
            setSuccessVisible(false);
            setTimeout(() => {
                setSuccess("error");
                setMensage("Erro ao confirmar frete, tente novamente, se o erro persistir contate o suporte");
                setSuccessVisible(true);
            }, 300);
        }
    }, []);

    return {
        concluirFrete,
        mensage,
        success,
        successVisible,
        closeSuccessNotification,
    }
}

export default useConcluirFreight;