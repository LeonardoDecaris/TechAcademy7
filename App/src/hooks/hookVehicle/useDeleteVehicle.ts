import { useCallback, useState } from "react";

import http from "@/src/service/httpAxios";
import { useAuth } from "@/src/context/AuthContext";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function useDeleteVehicle() {
    const { userId } = useAuth();
    const navigation = useNavigation<NavigationProp>();
    const navigateToHome = useCallback(() => { navigation.navigate("MainTabs"); }, [navigation]);

    const [mensage, setMensage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);

    const deleteVehicle = async () => {
        try {
            await http.delete(`caminhoneiro/${userId}`);

            setSuccess(true);
            setMensage("Veículo deletado com sucesso.");
            setSuccessVisible(true);

            setTimeout(navigateToHome, 800);
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            setSuccess(false);
            setMensage("Erro ao deletar veículo.");
            setSuccessVisible(true);
        }
    }

    const closeSuccessNotification = () => {
        setSuccessVisible(false);
    }

    return {
        deleteVehicle,
        closeSuccessNotification,
        mensage,
        success,
        successVisible
    };

}

export default useDeleteVehicle;