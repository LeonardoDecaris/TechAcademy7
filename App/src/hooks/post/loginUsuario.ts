import { useState } from "react";
import api from "../../service/ApiAxios"

import { useForm } from "react-hook-form";
import { useAuth } from "@/src/context/AuthContext";
import { validarEmail } from "../../utils/Validacao";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export type FormValuesLogin = {
	email: string;
	password: string;
};

function useHookLogin() {
	const navigation = useNavigation<NavigationProp>()
	const handleNavigation = {home: () => navigation.navigate('MainTabs')}

	const { control, handleSubmit, formState: { errors } } = useForm<FormValuesLogin>({ mode: "onSubmit" });
	const { login } = useAuth();

	const [successVisible, setSuccessVisible] = useState(false);
	const [Notificacao, setNotificacao] = useState<string>('');
	const [Status, setStatus] = useState<boolean>(false);

	const [lockUntil, setLockUntil] = useState<number | null>(null);
	const [failedAttempts, setFailedAttempts] = useState(0);

	const onSuccessDismiss = () => {
		setSuccessVisible(false);
	};

	const handleLogin = async (data: FormValuesLogin) => {
		
		if (lockUntil && Date.now() < lockUntil) {
			const remainingMs = lockUntil - Date.now();
			const seconds = Math.ceil(remainingMs / 1000);
			setStatus(false);
			setNotificacao(`Muitas tentativas de login. Tente novamente em ${seconds} segundos.`);
			setSuccessVisible(true);
			return;
		}

		try {
			const response = await api.post("/login", {
				email: data.email,
				password: data.password,
			});

			const { token } = response.data;
			login(token);

			setFailedAttempts(0);
			setLockUntil(null);

			setStatus(true);
			setNotificacao("Login realizado com sucesso!");
			setSuccessVisible(true);

			setTimeout(() => {
					handleNavigation.home();
			}, 1200);

		} catch (error) {
			console.log(error);

			const attempts = failedAttempts + 1;
			setFailedAttempts(attempts);

			setStatus(false);

			if (attempts >= 5) {
				const until = Date.now() + 1 * 60 * 1000; 
				setLockUntil(until);
				setNotificacao("Muitas tentativas de login. Tente novamente em 1 minuto.");
			} else {
				setNotificacao("Erro: Email ou senha inválidos.");
			}
			setSuccessVisible(true);
		}
	};
	
	return {
		onSuccessDismiss,
		successVisible,
		handleSubmit,
		Notificacao,
		handleLogin,
		control,
		errors,
		Status,

		rules: {
			email: {
				required: "Email é obrigatório",
				validate: validarEmail,
			},
			password: {
				required: "Senha é obrigatória",
			},
		},
	};
}

export default useHookLogin;