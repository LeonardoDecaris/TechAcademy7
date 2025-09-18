import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import http from "@/src/service/httpAxios";
import { RouteProp } from "@react-navigation/native";
import { validarPassword } from "@/src/utils/Validacao";
import { RootStackParamList } from "@/src/navigation/Routes";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AxiosError } from "axios";

type ForgotPasswordRoute = RouteProp<RootStackParamList, "ForgotPassword">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ForgotPassword {
  token?: string;
  password: string;
  confirmaSenha: string;
}

/**
 * Hook para redefinir senha.
 */
function useForgotPassword() {
  const route = useRoute<ForgotPasswordRoute>();
  const navigation = useNavigation<NavigationProp>();

  const { email, cpf, token: tokenParam } = route.params ?? {};

  const { control, handleSubmit, formState: { errors }, watch } = useForm<ForgotPassword>({
    mode: "onSubmit",
    defaultValues: { token: tokenParam ?? "" },
  });

  const [status, setStatus] = useState<"success" | "error" | "loading">("success");
  const [message, setMessage] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordValue = watch("password");

  const closeNotification = useCallback(() => {
    setNotificationVisible(false);
  if (status === "success") {
      navigation.navigate("Login");
    }
  }, [status, navigation]);

  const handleForgotPassword = useCallback(
    async (data: ForgotPassword) => {
      setLoading(true);
      setStatus("loading");
      setMessage("Verificando dados...");
      setNotificationVisible(true);

      try {
        const tokenToUse = tokenParam || data.token;

        if (!email || !cpf || !tokenToUse) {
          throw new Error("Dados insuficientes. Por favor, solicite a redefinição novamente.");
        }

        const res = await http.post("reset-password", {
          email,
          cpf,
          token: tokenToUse,
          newPassword: data.password,
        });

        setNotificationVisible(false);
        setTimeout(() => {
          setStatus("success");
          setMessage(res?.data?.message || "Senha redefinida com sucesso.");
          setNotificationVisible(true);
        }, 300);

      } catch (err) {
        const error = err as AxiosError<{ message?: string }> | Error;
        let errorMessage: string;

        if ('isAxiosError' in error && error.isAxiosError) {
          errorMessage = error.response?.data?.message || "Erro ao redefinir senha. Verifique suas informações.";
        } else {
          errorMessage = error.message;
        }

        setNotificationVisible(false);
        setTimeout(() => {
          setStatus("error");
          setMessage(errorMessage);
          setNotificationVisible(true);
        }, 300);
      } finally {
        setLoading(false);
      }
    },
    [email, cpf, tokenParam, navigation]
  );

  const rules = {
    token: !tokenParam ? { required: "Token é obrigatório" } : undefined,
    password: {
      validate: validarPassword,
      required: "Senha é obrigatória",
    },
    confirmaSenha: {
      required: "Confirmação de senha é obrigatória",
      validate: (value: string) =>
        value === passwordValue || "As senhas não conferem",
    },
  };

  return {
    rules,
    control,
    handleSubmit,
    loading,
    errors,
    status,
    message,
    notificationVisible,
    closeNotification,
    handleForgotPassword,
    showTokenField: !tokenParam,
  };
}

export default useForgotPassword;