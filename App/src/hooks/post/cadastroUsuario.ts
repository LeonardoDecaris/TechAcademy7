import { useState } from "react";
import api from "../../service/ApiAxios";
import { useForm } from "react-hook-form";

import { validarNome, validarCPF, validarEmail, validarPassword } from "../../utils/Validacao";


import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


type NavigationProp = NativeStackNavigationProp<RootStackParamList>


export type FormValues = {
	nome: string;
	cpf: string;
	email: string;
	password: string;
	confirmaSenha: string;
	cnh: string;
};

function useHookRegister() {
	const navigation = useNavigation<NavigationProp>()

	const { control, handleSubmit, watch, formState: { errors }} = useForm<FormValues>({ mode: "onSubmit" });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const password = watch("password");

	const handleNavigation = {
		login: () => navigation.navigate('Login'),
	}


	const handleCadastro = async (data: FormValues) => {
		try {
			await api.post("usuario", {
				nome: data.nome,
				cpf: data.cpf,
				email: data.email,
				password: data.password,
				cnh: data.cnh,
				datanascimento: new Date().toISOString(),
			});

			handleNavigation.login();
		} catch (error: any) {
			console.error("Erro ao realizar cadastro:", error);
			setErrorMessage("Erro ao se registrar: " + (error.response?.data?.message || error.message));
		}
	};

	return {
		control,
		handleSubmit,
		handleCadastro,
		errorMessage,
		setErrorMessage,
		errors,
		rules: {
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
		},
	};
}

export default useHookRegister;