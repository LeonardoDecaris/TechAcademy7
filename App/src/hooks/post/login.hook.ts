import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/src/context/AuthContext";
import api from "../../service/ApiAxios";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { validarEmail } from "../../utils/Validacao";
import axios from "axios";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MapLogin {
	email: string;
	password: string;
}

/**
 * Custom hook to manage user login form and submission.
 * @returns An object containing form control, submission handlers, and notification state.
 */
function useLogin() {
	const navigation = useNavigation<NavigationProp>();

	const { login } = useAuth();
	const { control, handleSubmit, formState: { errors } } = useForm<MapLogin>({ mode: "onSubmit" });

	const [success, setSuccess] = useState(false);
	const [notification, setNotification] = useState("");
	const [failedAttempts, setFailedAttempts] = useState(0);
	const [successVisible, setSuccessVisible] = useState(false);
	const [lockUntil, setLockUntil] = useState<number | null>(null);

	const navigateToHome = useCallback(() => { navigation.navigate("MainTabs"); }, [navigation]);

	const handleLogin = useCallback(
		async (data: MapLogin) => {

			if (lockUntil && Date.now() < lockUntil) {
				const remainingMs = lockUntil - Date.now();
				const seconds = Math.ceil(remainingMs / 1000);

				setSuccess(false);
				setNotification(`Muitas tentativas de login. Tente novamente em ${seconds} segundos.`);
				setSuccessVisible(true);

				return;
			}

			try {
				const response = await api.post("login", {
					email: data.email,
					password: data.password,
				});

				const { token } = response.data;
				login(token);

				setFailedAttempts(0);
				setLockUntil(null);

				setSuccess(true);
				setNotification("Login realizado com sucesso!");
				setSuccessVisible(true);

				setTimeout(navigateToHome, 800);
			} catch (error) {
				const attempts = failedAttempts + 1;
				setFailedAttempts(attempts);
				setSuccess(false);

				let msg = "Falha ao fazer login.";
				if (axios.isAxiosError(error)) {
					const status = error.response?.status;
					const data = error.response?.data;
					const backendMsg = typeof data === "string" ? data : data?.message;

					if (!error.response) {
						msg = "Falha de rede. Verifique sua conexão e o BASE_URL.";
					} else if (status === 401) {
						msg = backendMsg || "Email ou senha inválidos (401).";
					} else if (status === 404) {
						msg = "Rota /login não encontrada (404). Verifique BASE_URL e se a API está rodando.";
					} else if (status === 400) {
						msg = backendMsg || "Dados inválidos (400).";
					} else if (status === 500 || status === 503) {
						msg = "Servidor indisponível. Tente novamente em instantes.";
					} else {
						msg = `Erro ${status ?? "desconhecido"}: ${backendMsg || "Falha na requisição."}`;
					}

					console.log("[login][request]", {
						method: "POST",
						baseURL: api.defaults.baseURL,
						url: "login",
						payload: { email: data.email, password: "********" },
					});
					console.log("[login][response-error]", {
						status,
						data,
						apiUrl: error.config?.url,
						method: error.config?.method,
						headers: error.response?.headers,
					});
				} else {
					console.log("[login][unknown-error]", error);
				}

				if (attempts >= 5) {
					const until = Date.now() + 1 * 60 * 1000;
					setLockUntil(until);
					setNotification("Muitas tentativas de login. Tente novamente em 1 minuto.");
				} else {
					setNotification('Email ou senha inválidos.');
				}
				setSuccessVisible(true);
			}
		},
		[failedAttempts, lockUntil, login, navigateToHome]
	);

	const closeSuccessNotification = useCallback(() => {
		setSuccessVisible(false);
	}, []);

	const rules = {
		email: {
			required: "Email é obrigatório",
			validate: validarEmail,
		},
		password: {
			required: "Senha é obrigatória",
		},
	};

	return {
		rules,
		control,
		errors,
		success,
		handleLogin,
		handleSubmit,
		notification,
		successVisible,
		closeSuccessNotification,
	};
}

export default useLogin;