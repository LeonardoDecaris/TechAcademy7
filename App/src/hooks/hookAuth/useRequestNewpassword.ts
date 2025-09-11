import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import http from "@/src/service/httpAxios";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { validarCPF, validarEmail } from "@/src/utils/Validacao";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface RequestNewPassword {
  email: string;
  cpf: string;
}

/**
w * Hook responsável por gerenciar o formulário de solicitação de redefinição de senha.
 * @returns Objeto com regras, controles, handlers de envio e estado de notificações.
 */
function useRequestNewpassword() {
  const navigation = useNavigation<NavigationProp>();

  const { control, handleSubmit, formState: { errors } } = useForm<RequestNewPassword>({ mode: "onSubmit" });

  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const handleRequestNewPassword = useCallback(
    async (data: RequestNewPassword) => {
      try {

        const res = await http.post("request-password-reset", {
          email: data.email,
          cpf: data.cpf,
        });

        const backendMessage =
          res?.data?.message || "Solicitação registrada com sucesso.";
        const devToken = res?.data?.token as string | undefined;

        setSuccess(true);
        setNotification(backendMessage);
        setSuccessVisible(true);

        setTimeout(() => {
          navigation.navigate("ForgotPassword", {
            email: data.email,
            cpf: data.cpf,
            token: devToken,
          });
        }, 800);
      } catch (error: any) {

        const backendMessage =
          error?.response?.data?.message ||
          "Erro ao solicitar nova senha. Verifique os dados.";

        setSuccess(false);
        setNotification(backendMessage);
        setSuccessVisible(true);
      }
    },
    [navigation]
  );

  const closeSuccessNotification = useCallback(() => {
    setSuccessVisible(false);
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
    success,
    notification,
    successVisible,
    closeSuccessNotification,
    handleRequestNewPassword,
  };
}

export default useRequestNewpassword;