import { useCallback, useState } from "react";
import http from "../service/httpAxios";

function useConfirmFreight( id: string, idCaminhoneiro?: number ) {

    const [mensage, setMensage] = useState("");
    const [success, setSuccess] = useState("");
    const [successVisible, setSuccessVisible] = useState(false);


    const closeSuccessNotification = useCallback(() => {
        setSuccessVisible(false);
        if (success === "success") {
            return;
        }
    }, [success]);


    const confirmFreight = useCallback(async () => {
        setSuccess("loading");
        setMensage("Confirmando frete");
        setSuccessVisible(true);

        try {
            if (!idCaminhoneiro) {
                throw new Error("Caminhoneiro ID is required");
            }
            await http.put(`/frete/${id}`, {
                caminhoneiro_id: idCaminhoneiro,
                status_id: 2
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