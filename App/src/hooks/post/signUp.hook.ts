import { useState, useCallback } from "react";
import axios from "axios";

import api from "../../service/ApiAxios";
import { useForm } from "react-hook-form";
import { validarNome, validarCPF, validarEmail, validarPassword } from "../../utils/Validacao";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormValuesCadastro {
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
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormValuesCadastro>({ mode: "onSubmit" });
  const password = watch("password");

  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const navigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  const handleCadastro = useCallback(
    async (data: FormValuesCadastro) => {
      try {
        const payload = {
          nome: data.nome,
          cpf: String(data.cpf).replace(/\D/g, ""),
          email: data.email,
          password: data.password,
          cnh: data.cnh,
          datanascimento: new Date().toISOString(),
        };

        await api.post("/usuario", payload);

        setSuccess(true);
        setNotification("Cadastro realizado com sucesso!");
        setSuccessVisible(true);
        setTimeout(navigateToLogin, 800);
      } catch (error: any) {
        setSuccess(false);

        let msg = "Erro ao realizar cadastro";
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const data = error.response?.data;
          const backendMsg = typeof data === "string" ? data : data?.message;

          if (!error.response) {
            msg = "Falha de rede. Verifique BASE_URL e sua conexão.";
          } else if (status === 404) {
            msg = "Rota /usuario não encontrada (404). Verifique BASE_URL e se a API está rodando.";
          } else if (status === 400) {
            msg = backendMsg || "Dados inválidos (400).";
          } else if (status === 409) {
            msg = backendMsg || "Conflito (CPF ou e-mail já cadastrado).";
          } else {
            msg = `Erro ${status}: ${backendMsg || "Falha na requisição."}`;
          }

          // Logs úteis de diagnóstico
          const requestPayload = error.config?.data
            ? (() => {
                try {
                  const parsed = JSON.parse(error.config.data);
                  return { ...parsed, password: "********" };
                } catch {
                  return { password: "********" };
                }
              })()
            : { password: "********" };

          console.log("[signUp][request]", {
            method: "POST",
            baseURL: api.defaults.baseURL,
            url: "/usuario",
            payload: requestPayload,
          });
          console.log("[signUp][response-error]", {
            status,
            data,
            url: error.config?.url,
            method: error.config?.method,
            headers: error.response?.headers,
          });
        } else {
          console.log("[signUp][unknown-error]", error);
        }

        setNotification('Erro ao realizar cadastro');
        setSuccessVisible(true);
      }
    },
    [navigateToLogin]
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
    success,
    notification,
    successVisible,
    closeSuccessNotification,
    handleCadastro,
  };
}

export default useSignUp;