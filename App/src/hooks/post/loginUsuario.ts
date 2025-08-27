import { useState } from "react";
import api from "../../service/ApiAxios"

import { useForm } from "react-hook-form";
import { useAuth } from "@/src/context/AuthContext";
import { validarEmail, validarPassword } from "../../utils/Validacao";

export type FormValuesLogin = {
	email: string;
	password: string;
};

function useHookLogin() {

	const { control, handleSubmit, formState: { errors } } = useForm<FormValuesLogin>({ mode: "onSubmit" });
	const { login } = useAuth();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [desabledLogin, setDesabledLogin] = useState(false);

	const handleLogin = async (data: FormValuesLogin) => {

		setDesabledLogin(true);
		setErrorMessage(null);

		try {
			const response = await api.post("/login", {
				email: data.email,
				password: data.password,
			});

			const token = response.data;
			login(token);
			
		} catch (error) {
			setErrorMessage("Erro: Email ou senha inválidos.");
			console.log(error);
		} finally {
			setDesabledLogin(false);
		}
	};

	return {
		control,
		handleSubmit,
		handleLogin,
		errors,
		desabledLogin,
		errorMessage,
		setErrorMessage,

		rules: {
			email: {
				required: "Email é obrigatório",
				validate: validarEmail,
			},
			password: {
				required: "Senha é obrigatória",
				validate: validarPassword,
			},
		},
	};
}

export default useHookLogin;