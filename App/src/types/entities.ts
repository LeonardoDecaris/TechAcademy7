export type DadosFreteType = {
    carga?: {
        nome?: string;
        tipoCarga?: { nome?: string };
        peso?: string;
        imagemCarga?: { imgUrl?: string };
        valor_carga?: string;
    };
    empresa?: {
        imagemEmpresa?: { imgUrl?: string };
    };
    saida?: string;
    destino?: string;
    valor_frete?: string;
    status?: { id_status?: number };
    data_saida?: string;
    data_chegada?: string;
};

export type UserDataType = {
    nome?: string;
    email?: string;
    cnh?: string;
    imagemUsuario?: { imgUrl?: string };
};

export type VeiculoType = {
    modelo?: string;
    marca?: string;
    ano?: string;
    placa?: string;
    imagemVeiculo?: { imgUrl?: string };
    id_caminhoneiro?: number;
    capacidade: string;
    quilometragem: string;
};