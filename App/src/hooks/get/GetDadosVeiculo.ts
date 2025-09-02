import { useCallback, useState } from 'react';
import api from '@/src/service/ApiAxios';
import { useAuth } from '@/src/context/AuthContext';

export type ImagemVeiculo = { id_imagem?: number; imgUrl?: string | null };
export type Veiculo = {
  id_veiculo: number;
  marca?: string;
  modelo?: string;
  placa?: string;
  quilometragem?: number;
  ano?: number;
  capacidade?: number | string;
  imagemVeiculo?: ImagemVeiculo | null;
};

export default function useGetDadosVeiculo() {
  const { userId } = useAuth();
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getVeiculoDoUsuario = useCallback(async () => {
    if (!userId) {
      setError('User ID indisponível');
      setVeiculo(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get<Veiculo>(`usuario/${userId}/veiculo`);
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

  return { veiculo, loading, error, getVeiculoDoUsuario, clear };
}