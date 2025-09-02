import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";

import http from "@/src/service/httpAxios";
import { RouteProp } from "@react-navigation/native";
import { validarPassword } from "@/src/utils/Validacao";
import { RootStackParamList } from "@/src/navigation/Routes";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ForgotPasswordRoute = RouteProp<RootStackParamList, "ForgotPassword">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ForgotPassword {
  token?: string;
  password: string;
  confirmaSenha: string;
}

/**
 * Custom hook to manage the password reset form and submission.
 * @returns An object containing form control, submission handlers, notification state, and token field visibility.
 */
function useForgotPassword() {
  const route = useRoute<ForgotPasswordRoute>();
  const navigation = useNavigation<NavigationProp>();

  const { email, cpf, token: tokenParam } = route.params ?? {};

  const { control, handleSubmit, formState: { errors }, watch } = useForm<ForgotPassword>({
    mode: "onSubmit",
    defaultValues: { token: tokenParam ?? "" },
  });

  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const passwordValue = watch("password");


  const handleForgotPassword = useCallback(
    async (data: ForgotPassword) => {
      try {
        const tokenToUse = tokenParam || data.token;
        if (!email || !cpf) {
          setSuccess(false);
          setNotification("Email e CPF não informados. Volte e solicite novamente.");
          setSuccessVisible(true);
          return;
        }
        if (!tokenToUse) {
          setSuccess(false);
          setNotification("Informe o token enviado para seu email.");
          setSuccessVisible(true);
          return;
        }

        await http.post("reset-password", {
          email,
          cpf,
          token: tokenToUse,
          newPassword: data.password,
        });

        setSuccess(true);
        setNotification("Senha redefinida com sucesso!");
        setSuccessVisible(true);

        setTimeout(() => {
          navigation.navigate("Login");
        }, 800);
      } catch (error) {
        setSuccess(false);
        setNotification("Erro ao redefinir senha. Verifique suas informações.");
        setSuccessVisible(true);
      }
    },
    [email, cpf, tokenParam, navigation]
  );

  const closeSuccessNotification = useCallback(() => {
    setSuccessVisible(false);
  }, []);

  const rules = {
    token: !tokenParam ? { required: "Token é obrigatório" } : undefined,
    password: {
      validate: validarPassword,
      required: "Senha é obrigatória",
    },
    confirmaSenha: {
      required: "Confirmação de senha é obrigatória",
      validate: (value: string) => value === passwordValue || "As senhas não conferem",
    }
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
    handleForgotPassword,
    showTokenField: !tokenParam,
  };
}

export default useForgotPassword;