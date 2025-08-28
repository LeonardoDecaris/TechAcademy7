import { useState } from "react";
import api from "../../service/ApiAxios"

import { useForm } from "react-hook-form";
import { useAuth } from "@/src/context/AuthContext";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "@/src/navigation/Routes";
import { validarEmail, validarPassword } from "../../utils/Validacao";
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
	
	const handleLogin = async (data: FormValuesLogin) => {
		try {
			const response = await api.post("login", {
				email: data.email,
				password: data.password,
			});


			const { token } = response.data;
			login(token);

			setStatus(true);
			setNotificacao("Login realizado com sucesso!");
			setSuccessVisible(true);
			
		} catch (error) {
			console.log(error);
			setStatus(false);
			setNotificacao("Erro: Email ou senha inválidos.");
			setSuccessVisible(true);
		}
	};
	

	const onSuccessDismiss = () => {
		setSuccessVisible(false);
		if(Status) {
			handleNavigation.home();
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