import { useState, useCallback } from "react";

import { useForm } from "react-hook-form";
import http from "@/src/service/httpAxios";
import { validarNome, validarCPF, validarEmail, validarPassword } from "@/src/utils/Validacao";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SingUp {
  nome: string;
  cpf: string;
  email: string;
  password: string;
  confirmaSenha: string;
  cnh: string;
}

/**
 * Custom hook to manage user registration form and submission.
 * @returns An object containing form control, submission handlers, and notification state.
 */
function useSignUp() {
  const navigation = useNavigation<NavigationProp>();

  const { control, handleSubmit, watch, formState: { errors } } = useForm<SingUp>({ mode: "onSubmit" });
  const password = watch("password");

  const [status, setStatus] = useState("");
  const [mensage, setMensage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const navigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  const closeSuccessNotification = useCallback(() => {
    setSuccessVisible(false);
    if (status === "success") {
      navigateToLogin();
    }
  }, [status, navigateToLogin]);


  const handleSignUp = useCallback(
    async (data: SingUp) => {
      setStatus("loading");
      setMensage("Realizando cadastro...");
      setSuccessVisible(true);

      try {
        const response = await http.post("usuario", {
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          password: data.password,
          cnh: data.cnh,
          datanascimento: new Date().toISOString(),
        });

        setSuccessVisible(false);
        setTimeout(() => {
          setStatus("success");
          setMensage(response.data.mensagem ?? "Cadastro realizado com sucesso!");
          setSuccessVisible(true);
        }, 300);

        setTimeout(navigateToLogin, 800);
      } catch (error: any) {
        console.log(error);
        setSuccessVisible(false);
        setTimeout(() => {
          setStatus("error");
          const serverMessage = error?.response?.data?.message as string | undefined;
          console.log(serverMessage);
          setMensage(serverMessage ?? "Erro ao realizar cadastro. Tente novamente.");
          setSuccessVisible(true);
        }, 300);
        console.log("Registration error:", error);
      }
    },
    [navigateToLogin]
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
    password: {
      validate: validarPassword,
      required: "Senha é obrigatória",
    },
    confirmaSenha: {
      validate: (value: string) => value === password || "As senhas não coincidem",
      required: "Confirmação de senha é obrigatória",
    },
    cnh: {
      required: "CNH é obrigatória",
    },
  };

  return {
    control,
    handleSubmit,
    errors,
    rules,
    status,
    mensage,
    successVisible,
    closeSuccessNotification,
    handleSignUp,
  };
}

export default useSignUp;