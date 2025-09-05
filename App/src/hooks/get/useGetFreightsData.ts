import { useCallback, useState } from 'react';

import http from '@/src/service/httpAxios';
import { useAuth } from '@/src/context/AuthContext';

export type Carga = { id_carga?: number; nome?: string | null; descricao?: string | null; peso?: number | null; valor_carga?: number | null; imagemCarga_id?: string | null, tipoCarga_id?: string | null };
export type Empresa = { id_empresa?: number; nome?: string | null; cnpj?: string | null; tipo?: string | null; avaliacao?: number | null; localidade?: string | null; imagemEmpresa_id?: string | null };
export type Status = { id_status?: number; nome?: string | null };

export type Frete = {
  id_frete: number;
  saida?: string;
  destino?: string;
  valor_frete?: number;
  data_saida?: Date;
  data_chegada?: Date;
  prazo?: number;
  distancia?: number;
  status_id?: Status | null;
  carga_id?: Carga | null;
  empresa_id?: Empresa | null;

};

export default function useGetFreightData() {
  const { userId } = useAuth();
  const [frete, setFrete] = useState<Frete | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFreightData = useCallback(async () => {
    if (!userId) {
      setError('User ID indisponível');
      setFrete(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await http.get<Veiculo>(`usuario/${userId}/veiculo`);
      setVeiculo(data);
      return data;
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 404) {
        // Usuário ainda não possui veículo vinculado
        setVeiculo(null);
        return null;
      }
      const msg = e?.response?.data?.message ?? 'Falha ao buscar veículo do usuário.';
      setError(msg);
      setVeiculo(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const clear = useCallback(() => {
    setVeiculo(null);
    setError(null);
  }, []);

  return { veiculo, loading, error, getVehicleData, clear };
}