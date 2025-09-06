export interface Carga {
    id: number;
    descricao: string;
    peso: number;
    volume: number;
    empresaId: number;
}

export interface Caminhoneiro {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
}

export interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
    endereco: string;
}

export interface Frete {
    id: number;
    cargaId: number;
    caminhoneiroId: number;
    valor: number;
    statusId: number;
}

export interface ImagemCarga {
    id: number;
    cargaId: number;
    url: string;
}

export interface ImagemEmpresa {
    id: number;
    empresaId: number;
    url: string;
}

export interface ImagemUsuario {
    id: number;
    usuarioId: number;
    url: string;
}

export interface Status {
    id: number;
    descricao: string;
}

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

export interface Veiculo {
    id: number;
    placa: string;
    modelo: string;
    caminhoneiroId: number;
}