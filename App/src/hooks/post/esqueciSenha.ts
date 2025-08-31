import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import api from "@/src/service/ApiAxios";
import { validarPassword } from "@/src/utils/Validacao";

type EsqueciSenhaRoute = RouteProp<RootStackParamList, "EsqueciSenha">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormResetSenha {
  token?: string;
  password: string;
  confirmaSenha: string;
}

/**
 * Custom hook to manage the password reset form and submission.
 * @returns An object containing form control, submission handlers, notification state, and token field visibility.
 */
function useEsqueciSenha() {
  const route = useRoute<EsqueciSenhaRoute>();
  const navigation = useNavigation<NavigationProp>();

  const { email, cpf, token: tokenParam } = route.params ?? {};

  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormResetSenha>({
    mode: "onSubmit",
    defaultValues: { token: tokenParam ?? "" },
  });

  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const passwordValue = watch("password");


  const handleResetPassword = useCallback(
    async (data: FormResetSenha) => {
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

        await api.post("/reset-password", {
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
      } catch (error: any) {
        console.error("[EsqueciSenha] Erro na requisição", {
          message: error?.message,
          url: error?.config?.url,
          method: error?.config?.method,
          status: error?.response?.status,
          responseData: error?.response?.data,
        });
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


  return {
    rules: {
      token: !tokenParam ? { required: "Token é obrigatório" } : undefined,
      password: {
        validate: validarPassword,
        required: "Senha é obrigatória",
      },
      confirmaSenha: {
        required: "Confirmação de senha é obrigatória",
        validate: (value: string) => value === passwordValue || "As senhas não conferem",
      },
    },
    
    control,
    handleSubmit,
    errors,
    success,
    notification,
    successVisible,
    closeSuccessNotification,
    handleResetPassword,
    showTokenField: !tokenParam,
  };
}

export default useEsqueciSenha;