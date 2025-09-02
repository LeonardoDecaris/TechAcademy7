import { useState, useCallback, useMemo, useEffect } from "react";
import api from "@/src/service/ApiAxios";
import { useForm } from "react-hook-form";
import { validarCPF, validarEmail } from "@/src/utils/Validacao";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/Routes";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormSolicitarNovaSenha {
  email: string;
  cpf: string;
}

/**
 * Custom hook to manage the password reset request form and submission.
 * @returns An object containing form control, submission handlers, and notification state.
 */
function useSolicitarNovaSenha() {
  const navigation = useNavigation<NavigationProp>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormSolicitarNovaSenha>({ mode: "onSubmit" });
  
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);


  const handleSolicitarNovaSenha = useCallback( async (data: FormSolicitarNovaSenha) => {

      try {
        const res = await api.post("request-password-reset", {
          email: data.email,
          cpf: data.cpf,
        });


        const devToken = res?.data?.token as string | undefined;
        setSuccess(true);
        setNotification("Solicitação de nova senha enviada com sucesso!");
        setSuccessVisible(true);

        setTimeout(() => {
          navigation.navigate("EsqueciSenha", { email: data.email, cpf: data.cpf, token: devToken });
        }, 800);

      } catch (error: any) {
        setSuccess(false);
        setNotification("Erro ao solicitar nova senha. Verifique suas informações.");
        setSuccessVisible(true);
        
        console.log("[SolicitarNovaSenha] Erro na requisição", error);
      }
    },
    [navigation]
  );

  const closeSuccessNotification = useCallback(() => {
    setSuccessVisible(false);
  }, []);

  return {
    rules: {
       email: {
        required: "Email é obrigatório",
        validate: validarEmail,
      },
      cpf: {
        required: "CPF é obrigatório",
        validate: validarCPF,
      },
    },

    control,
    handleSubmit,
    errors,
    success,
    notification,
    successVisible,
    closeSuccessNotification,
    handleSolicitarNovaSenha,
  };
}

export default useSolicitarNovaSenha;