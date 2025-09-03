import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import type { AxiosError } from "axios";
import http from "@/src/service/httpAxios";

import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { validarNome, validarCPF, validarEmail } from "@/src/utils/Validacao";

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
 * @param userId - The ID of the user to edit.
 * @returns An object containing form control, submission handlers, and notification state.
 */
function useEditarUsuario(userId: string) {
  const navigation = useNavigation<NavigationProp>();
  const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormValuesEditarPerfil>({ mode: "onSubmit" });

  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToPerfil = useCallback(() => {
    navigation.navigate("MainTabs", { screen: "Perfil" });
  }, [navigation]);

  const handleEditar = useCallback(
    async (data: FormValuesEditarPerfil) => {
      setLoading(true);
      try {
        await http.put(`usuario/${userId}`, {
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          cnh: data.cnh ?? null,
          datanascimento: new Date().toISOString(),
          imagemUsuario_id: data.imagemUsuario_id || null,
        });

        setSuccess(true);
        setNotification("Dados atualizados com sucesso!");
        setSuccessVisible(true);

        setTimeout(navigateToPerfil, 800);
      } catch (err: unknown) {
        const error = err as AxiosError<{ errors?: Record<string, string>; message?: string }>;
        setSuccess(false);

        const fieldErrors = error.response?.data?.errors;
        if (fieldErrors && typeof fieldErrors === "object") {
          Object.entries(fieldErrors).forEach(([field, message]) => {
            setError(field as keyof FormValuesEditarPerfil, {
              type: "server",
              message: String(message),
            });
          });
        }

        setNotification(error.response?.data?.message || "Erro ao atualizar dados");
        console.error("User update error:", error);
      } finally {
        setLoading(false);
      }
    },
    [navigateToPerfil, setError, userId]
  );

  const closeSuccessNotification = useCallback(() => {
    setSuccessVisible(false);
  }, []);

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
      required: false,
    },
  };

  return {
    rules,
    errors,
    control,
    loading,
    success,
    setValue,
    handleEditar,
    notification,
    handleSubmit,
    successVisible,
    closeSuccessNotification,
  };
}

export default useEditarUsuario;