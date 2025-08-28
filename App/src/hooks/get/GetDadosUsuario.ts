import { useAuth } from "@/src/context/AuthContext";
import api from "@/src/service/ApiAxios";
import { useState, useCallback, useMemo } from "react";
import { getInitials, getDisplayName } from "@/src/utils/funcoes";

interface mapImagemUsuario {
	id: number;
	url: string;
}

interface mapUsers {
	id: string;
	nome: string;
	email: string;
	cpf: string;
	imagemUsuario_id: mapImagemUsuario;
}

function GetdadosUsuario() {
    const { userId } = useAuth();
    const [DadosUsuario, SetDadosUsuario] = useState<mapUsers>();

    const getUserById = useCallback(async () => {
        try {
            const { data } = await api.get(`usuario/${userId}`);
            SetDadosUsuario(data);
        } catch (error) {
            console.log(error);
        }
    }, [userId]);

    const iniciaisUsuario = useMemo(
        () => getInitials(DadosUsuario?.nome),
        [DadosUsuario?.nome]
    );

    const nomeExibicao = useMemo(
        () => getDisplayName(DadosUsuario?.nome),
        [DadosUsuario?.nome]
    );

    return {
        DadosUsuario,
        iniciaisUsuario,
        nomeExibicao,
        getUserById,
    };
}

export default GetdadosUsuario;
