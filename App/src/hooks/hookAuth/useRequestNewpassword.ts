import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import http from "@/src/service/httpAxios";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { validarCPF, validarEmail } from "@/src/utils/Validacao";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AxiosError } from "axios";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface RequestNewPassword {
  email: string;
  cpf: string;
}

/**
 * Hook responsável por gerenciar o formulário de solicitação de redefinição de senha.
 * @returns Objeto com regras, controles, handlers de envio e estado de notificações.
 */
function useRequestNewpassword() {
  const navigation = useNavigation<NavigationProp>();

  const { control, handleSubmit, formState: { errors } } = useForm<RequestNewPassword>({ mode: "onSubmit" });

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestNewPassword = useCallback(
    async (data: RequestNewPassword) => {
      setLoading(true);
      setStatus("loading");
      setMessage("Enviando solicitação...");
      setNotificationVisible(true);

      try {
        const res = await http.post("request-password-reset", {
          email: data.email,
          cpf: data.cpf,
        });

        const backendMessage = res?.data?.message || "Solicitação registrada com sucesso.";
        const devToken = res?.data?.token as string | undefined;

        setNotificationVisible(false);
        setTimeout(() => {
          setStatus("success");
          setMessage(backendMessage);
          setNotificationVisible(true);

          setTimeout(() => {
            navigation.navigate("ForgotPassword", {
              email: data.email,
              cpf: data.cpf,
              token: devToken,
            });
          }, 1000);
        }, 300);

      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        const backendMessage = error?.response?.data?.message || "Erro ao solicitar nova senha. Verifique os dados.";

        setNotificationVisible(false);
        setTimeout(() => {
          setStatus("error");
          setMessage(backendMessage);
          setNotificationVisible(true);
        }, 300);
      } finally {
        setLoading(false);
      }
    },
    [navigation]
  );

  const closeNotification = useCallback(() => {
    setNotificationVisible(false);
  }, []);

  const rules = {
    email: {
      required: "E-mail é obrigatório",
      validate: validarEmail,
    },
    cpf: {
      required: "CPF é obrigatório",
      validate: validarCPF,
    },
  };

  return {
    rules,
    control,
    handleSubmit,
    errors,
    status,
    message,
    notificationVisible,
    closeNotification,
    handleRequestNewPassword,
    loading,
  };
}

export default useRequestNewpassword;