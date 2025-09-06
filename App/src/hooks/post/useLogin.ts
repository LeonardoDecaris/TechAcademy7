import { useState, useCallback } from "react";

import { useForm } from "react-hook-form";
import http from "@/src/service/httpAxios";
import { useAuth } from "@/src/context/AuthContext";

import { validarEmail } from "@/src/utils/Validacao";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
				const response = await http.post("login", {
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

				if (attempts >= 5) {
					const until = Date.now() + 1 * 60 * 1000;
					setLockUntil(until);
					setNotification("Muitas tentativas de login. Tente novamente em 1 minuto.");
				} else {
					setNotification("Erro: Email ou senha inválidos.");
				}
				setSuccessVisible(true);
				console.log("Login error:", error);
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