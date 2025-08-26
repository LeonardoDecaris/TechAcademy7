import { useState } from "react";
import api from "../../service/ApiAxios";
import { useForm } from "react-hook-form";

import { validarNome, validarCPF, validarEmail, validarPassword, validacaoComfirmarPassword } from "../../utils/Validacao";

export type FormValues = {
	nome: string;
	cpf: string;
	email: string;
	password: string;
	confirmaSenha: string;
	dataNascimento: string;	
};

function useHookRegister() {

	const { control, handleSubmit, watch, formState: { errors }} = useForm<FormValues>({ mode: "onSubmit" });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const password = watch("password");

	const handleCadastro = async (data: FormValues) => {
		try {
			await api.post("/users", {
				nome: data.nome,
				cpf: data.cpf,
				email: data.email,
				senha: data.password,
				dataNascimento: data.dataNascimento,
			});
		} catch (error) {
			setErrorMessage("Erro ao se registrar");
			console.log(error);
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
				   validate: (value: string) => validacaoComfirmarPassword(value, password),
				   required: "Confirmação de senha é obrigatória",
			   },
			   dataNascimento: {
				   required: "Data de nascimento é obrigatória"
			   }
		   },
	};
}

export default useHookRegister;