import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import type { AxiosError } from "axios";
import http from "@/src/service/httpAxios";

import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { validarNome, validarCPF, validarEmail } from "@/src/utils/Validacao";
import { useAuth } from "@/src/context/AuthContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormValuesEditarPerfil {
  nome: string;
  cpf: string;
  email: string;
  cnh?: string;
  imagemUsuario_id?: string | null;
}

/**
 * Custom hook to manage user profile editing form and submission.
 * @returns An object containing form control, submission handlers, and notification state.
 */
function useEditarUsuario() {
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormValuesEditarPerfil>({ mode: "onSubmit" });
  const { userId } = useAuth();

  const [status, setStatus] = useState<"success" | "error" | "loading">("success");
  const [message, setMessage] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigation = { profile: () => navigation.navigate('MainTabs', { screen: 'Profile' }) };

  const navigateToProfile = useCallback(() => {
    handleNavigation.profile();
  }, [handleNavigation]);

  const closeNotification = useCallback(async () => {
    setNotificationVisible(false);
    if (status === "success") {
      navigateToProfile();
    }
  }, [navigateToProfile, status]);

  const handleEditar = useCallback(
    async (data: FormValuesEditarPerfil) => {
      setLoading(true);
      setStatus("loading");
      setMessage("Atualizando dados...");
      setNotificationVisible(true);

      try {
        await http.put(`usuario/${userId}`, {
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          cnh: data.cnh,
          datanascimento: new Date().toISOString(),
          imagemUsuario_id: data.imagemUsuario_id || null,
        });

        setNotificationVisible(false);
        setTimeout(() => {
          setStatus("success");
          setMessage("Dados atualizados com sucesso!");
          setNotificationVisible(true);
        }, 300);

      } catch (err) {
        const error = err as AxiosError<{ errors?: Record<string, string>; message?: string }>;

        setNotificationVisible(false);
        setTimeout(() => {
          setStatus("error");
          const serverMessage = error.response?.data?.message;
          setMessage(serverMessage || "Erro ao atualizar dados.");
          setNotificationVisible(true);

          const fieldErrors = error.response?.data?.errors;
          if (fieldErrors && typeof fieldErrors === "object") {
            Object.entries(fieldErrors).forEach(([field, msg]) => {
              setError(field as keyof FormValuesEditarPerfil, {
                type: "server",
                message: String(msg),
              });
            });
          }
        }, 300);
      } finally {
        setLoading(false);
      }
    },
    [setError, userId, handleNavigation.profile]
  );

  const rules = {
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
      required: "CNH é obrigatória",
    },
  };

  return {
    rules,
    errors,
    control,
    loading,
    status,
    message,
    setValue,
    handleEditar,
    handleSubmit,
    notificationVisible,
    closeNotification,
  };
}

export default useEditarUsuario;