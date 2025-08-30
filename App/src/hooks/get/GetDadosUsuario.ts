import { useAuth } from "@/src/context/AuthContext";
import api from "@/src/service/ApiAxios";
import { useState, useCallback, useMemo } from "react";
import { getInitials, getDisplayName } from "@/src/utils/funcoes";

interface mapImagemUsuario {
    id_imagem: number;
    imgUrl: string;
}

interface mapUsers {
    id_usuario: number;
    nome: string;
    email: string;
    cpf: string;
    cnh: string;
    imagemUsuario_id: number | null;
    imagemUsuario: mapImagemUsuario | null;
}

function GetdadosUsuario() {
    const { userId } = useAuth();
    const [DadosUsuario, SetDadosUsuario] = useState<mapUsers>();

    const getUserById = useCallback(async () => {
        try {
            const { data } = await api.get(`/usuario/${userId}`);
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
