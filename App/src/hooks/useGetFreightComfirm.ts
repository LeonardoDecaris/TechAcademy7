import { useCallback, useState } from "react";
import http from "../service/httpAxios";


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

interface frete {
  id_frete: number;
  saida: string;
  destino: string;
  valor_frete: string;
  prazo: string;

  data_saida: Date | null;
  data_chegada: Date | null;

  carga_id: number;
  status_id: number;
  empresa_id: number;
  caminhoneiro_id: number | null;

  carga: carga;
  status: status;
  empresa: empresa;
  caminhoneiro: caminhoneiro | null;
}

function useGetFreightConfirm(id: number) {
    const [dadosFrete, setDadosFrete] = useState<frete>();
    const [mensage, setMensage] = useState("");
    const [success, setSuccess] = useState("");
    const [successVisible, setSuccessVisible] = useState(false);
    
    const closeSuccessNotification = useCallback(() => {
        setSuccessVisible(false);
    }, []);

    const getDados = useCallback(async () => {

        try {
            const { data } = await http.get<frete>(`frete/caminhoneiro/${id}`);
            setDadosFrete(data);

        } catch (error) {

            console.log(error, 'messagem de error')

            setSuccessVisible(false);
            setSuccess("error");
            setMensage("Erro ao carregar dados, tente novamente mais tarde.");
            setSuccessVisible(true);
        }

    }, [id]);


    return {
        closeSuccessNotification,
        getDados,
        mensage,
        success,
        successVisible,
        dadosFrete
    };
}

export default useGetFreightConfirm;