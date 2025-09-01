import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AxiosError } from "axios";
import api from "../../service/ApiAxios";
import { validarNome, validarCPF, validarEmail } from "../../utils/Validacao";
import { RootStackParamList } from "@/src/navigation/Routes";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormValuesEditarPerfil {
  nome: string;
  cpf: string;
  email: string;
  cnh?: string;
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
        await api.put(`/usuario/${userId}`, {
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          cnh: data.cnh ?? null,
          datanascimento: new Date().toISOString(),
          imagemUsuario_id: "3"
        });

        setSuccess(true);
        setNotification("Dados atualizados com sucesso!");
        setSuccessVisible(true);

        setTimeout(navigateToPerfil, 1200);
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
    control,
    handleSubmit,
    errors,
    rules,
    setValue,
    success,
    notification,
    successVisible,
    closeSuccessNotification,
    handleEditar,
    loading,
  };
}

export default useEditarUsuario;