import { useCallback, useState } from 'react';
import http from '@/src/service/httpAxios';
import { useAuth } from '@/src/context/AuthContext';

export interface ImagemEmpresa {
  id_imagem?: number;
  imgUrl?: string | null;
}

export interface Empresa {
  id_empresa: number;
  nome: string;
  cnpj: string;
  tipo: string;
  avaliacao?: number | null;
  localidade: string;
  imagemEmpresa_id?: number | null;
  imagemEmpresa?: ImagemEmpresa | null;
}

export default function useGetCompanyData() {
  const { token } = useAuth();
  const [empresas, setEmpresas] = useState<Empresa[] | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.get<Empresa[]>(`empresa`); // GET /empresa (lista)
      setEmpresas(data);
      return data;
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? 'Falha ao listar empresas';
      setError(msg);
      setEmpresas(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCompanyById = useCallback(async (id: number) => {
    if (!id) return null;
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.get<Empresa>(`empresa/${id}`); // GET /empresa/:id
      setEmpresa(data);
      return data;
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 404) {
        setEmpresa(null);
        setError('Empresa não encontrada');
        return null;
      }
      const msg = e?.response?.data?.message ?? 'Falha ao buscar empresa';
      setError(msg);
      setEmpresa(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setEmpresa(null);
    setEmpresas(null);
    setError(null);
  }, []);

  return { empresa, empresas, loading, error, listCompanies, getCompanyById, clear };
}
