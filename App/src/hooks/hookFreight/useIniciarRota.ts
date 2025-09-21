import { useCallback, useState } from "react";
import http from "../../service/httpAxios";

import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function useIniciarRota() {
    
    const navigation = useNavigation<NavigationProp>();

    const [mensage, setMensage] = useState("");
    const [success, setSuccess] = useState("");
    const [successVisible, setSuccessVisible] = useState(false);

    const handleNavigation = { profile: () => navigation.navigate('MainTabs', { screen: 'Home' }) };

    const closeSuccessNotification = useCallback(() => {
        setSuccessVisible(false);
        if (success === "success") { handleNavigation.profile(); }
    }, [success]);

    const iniciarRota = useCallback(async (id: string,) => {
        setSuccess("loading");
        setMensage("Confirmando frete");
        setSuccessVisible(true);

        try {
            await http.put(`/frete/${id}`, {
                status_id: 2,
                data_saida: new Date().toISOString(),
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
        iniciarRota,
        mensage,
        success,
        successVisible,
        closeSuccessNotification,
    }
}

export default  useIniciarRota;