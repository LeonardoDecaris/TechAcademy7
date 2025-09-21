
interface imagemEmpresa {
  id_imagem: number;
  imgUrl: string;
}

interface empresa {
  id_empresa: number;
  nome: string;
  tipo: string;
  avaliacao: number;
  localizacao: string;
  imagemEmpresa_id: number;

  imagemEmpresa: imagemEmpresa;
}

interface imagemCarga {
  id_imagem: number;
  imgUrl: string;
}

interface tipo {
  id_tipo: number;
  nome: string;
}
interface carga {
  nome: string;
  peso: string;
  id_carga: number;
  descricao: string;
  valor_carga: string;
  imagemCarga_id: number;
  tipoCarga_id: number;

  imagemCarga: imagemCarga;
  tipoCarga: tipo;
}

interface status {
  id_status: number;
  nome: string;
}

interface caminhoneiro {
  id_caminhoneiro: number;
  usuario_id: number;
  veiculo_id: number;
}

export interface frete {
  id_frete: number;
  saida: string;
  destino: string;
  valor_frete: string;
  prazo: string;

  carga_id: number;
  status_id: number;
  empresa_id: number;
  caminhoneiro_id: number | null;

  carga: carga;
  status: status;
  empresa: empresa;
  caminhoneiro: caminhoneiro | null;
}
