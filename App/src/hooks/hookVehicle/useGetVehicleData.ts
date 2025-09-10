import { useCallback, useState } from 'react';

import http from '@/src/service/httpAxios';
import { useAuth } from '@/src/context/AuthContext';

interface veiculoImagem {
  id_imagemVeiculo: number;
  imgUrl: string;
}
interface Veiculo {
  marca: string;
  modelo: string;
  placa: string;
  ano: string;
  capacidade: string;
  quilometragem: string;
  imagemVeiculo_id: number;
  
  imagemVeiculo: veiculoImagem;
}

interface Caminhoneiro {
  id_caminhoneiro: number;
  veiculo_id: number;

  veiculo: Veiculo;
}

export default function useGetVehicleData() {

  const { userId } = useAuth();
  const [veiculo, setVeiculo] = useState<Caminhoneiro | null>(null);

  const getVehicleData = useCallback(async () => {
    try {

      const { data } = await http.get<Caminhoneiro>(`/caminhoneiro/${userId}`);
      setVeiculo(data);
      return data;
    } catch (error: any) {
      setVeiculo(null);
    }
  }, [userId]);

  return {
    veiculo,
    getVehicleData,
  };
}