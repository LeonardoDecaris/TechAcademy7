import { useState } from "react";
import api from "../../service/ApiAxios";
import { useForm } from "react-hook-form";
import { validarNome, validarCPF, validarEmail } from "../../utils/Validacao";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AxiosError } from "axios";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type EditFormValues = {
  nome: string;
  cpf: string;
  email: string;
  cnh?: string;
};

const useHookEditarUsuario = (userId: string) => {
  const navigation = useNavigation<NavigationProp>();
  const handleNavigation = {
    perfil: () => navigation.navigate('MainTabs', { screen: 'Perfil' })
  };

  const { control, handleSubmit, setValue, setError, formState: { errors } } =
    useForm<EditFormValues>({ mode: "onSubmit" });

  const [successVisible, setSuccessVisible] = useState(false);
  const [notificacao, setNotificacao] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSuccessDismiss = () => setSuccessVisible(false);

  const handleEditar = async (data: EditFormValues) => {
    setLoading(true);
    try {
        await api.put(`/usuario/${userId}`, {
            nome: data.nome,
            cpf: data.cpf,
            email: data.email,
            cnh: data.cnh ?? null,
            datanascimento: new Date().toISOString(),
        });

      setStatus(true);
      setNotificacao("Dados atualizados com sucesso!");
      setSuccessVisible(true);

      setTimeout(() => {
        handleNavigation.perfil();
      }, 1400);
    } catch (err) {
      const error = err as AxiosError<any>;
      setStatus(false);

      // Tenta mapear erros de validação do backend (ex: 400/422)
      const fieldErrors = (error.response?.data as any)?.errors;
      if (fieldErrors && typeof fieldErrors === "object") {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field as keyof EditFormValues, {
            type: "server",
            message: String(message),
          });
        });
      }

      setNotificacao(
        (error.response?.data as any)?.message || "Erro ao atualizar dados"
      );
      console.error("Erro ao editar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSuccessDismiss,
    handleEditar,
    successVisible,
    handleSubmit,
    notificacao,
    control,
    status,
    loading,
    errors,
    setValue,
    rules: {
      nome: {
        validate: validarNome,
        required: "Nome é obrigatório",
      },
      cpf: {
        validate: validarCPF,
        required: "CPF é obrigatório",
      },
      email: {
        validate: validarEmail,
        required: "Email é obrigatório",
      },
      cnh: {
        required: false,
      },
    },
  };
}

export default useHookEditarUsuario;
