import React, { useEffect } from "react";

import InputAuth from "@/src/components/form/InputAuth";
import { SafeAreaView, View, Text, Image } from "react-native";
import { ButtonPadrao, ButtonUpload } from "@/src/components/form/Buttons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import DropDown from "@/src/components/form/DropDown";
import GetdadosUsuario from "@/src/hooks/get/GetDadosUsuario";
import useHookEditarUsuario from "@/src/hooks/put/EditarUsuario";
import AlertNotificacao from "@/src/components/modal/AlertrNotificacao";

import { BASE_URL } from '@env';
import { useAuth } from "@/src/context/AuthContext";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function EditarPerfil() {
	const navigation = useNavigation<NavigationProp>();
	
	const { userId } = useAuth();
	const { DadosUsuario, getUserById, iniciaisUsuario } = GetdadosUsuario();
	const { control, handleSubmit, rules, setValue, handleEditar, successVisible, notificacao, status, onSuccessDismiss } = useHookEditarUsuario(userId ?? "");
	const imagemUrl = DadosUsuario?.imagemUsuario?.imgUrl ? `${BASE_URL}${DadosUsuario.imagemUsuario.imgUrl}` : null;

	useEffect(() => {
		getUserById();
	}, [getUserById]);

	useEffect(() => {
		if (DadosUsuario) {
			setValue("nome", DadosUsuario.nome || "");
			setValue("email", DadosUsuario.email || "");
			setValue("cpf", DadosUsuario.cpf || "");
			setValue("cnh", DadosUsuario.cnh || "");
		}
	}, [DadosUsuario, setValue]);

	return (
		<SafeAreaView className="flex-1 bg-white px-5">
			<KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 20 }} enableOnAndroid={true}>
				<AlertNotificacao
					visible={successVisible}
					status={status}
					messagem={notificacao}
					duration={1200}
					onDismiss={onSuccessDismiss}
				/>

				<View className=" flex-col gap-5 justify-center items-center pb-5">
					{imagemUrl ? (
						<Image
							source={{ uri: imagemUrl }}
							style={{ width: 100, height: 100, borderRadius: 50,  }}
						/>
					) : (
						<View className="h-24 w-24 rounded-full bg-gray-200 items-center justify-center">
							<Text className="font-bold text-black text-3xl">
								{iniciaisUsuario}
							</Text>
						</View>
					)}

					<ButtonUpload
						onPress={() => {}}
						title="Alterar Foto"
					/>
				</View>

				<View className="w-full flex-col gap-2.5">
					<InputAuth
						id="nome"
						name="nome"
						label="Nome"
						placeholder="Nome completo"
						control={control}
						rules={rules.nome}
					/>
					<InputAuth
						id="email"
						name="email"
						label="Email"
						placeholder="Email"
						desabilitar={true}
						control={control}
						rules={rules.email}
					/>
					<InputAuth
						id="cpf"
						name="cpf"
						label="CPF"
						placeholder="CPF"
						control={control}
						rules={rules.cpf}
					/>
					<DropDown
						name="cnh"
						label="Tipo de CNH"
						placeholder="Selecione o tipo de CNH"
						control={control}
						rules={rules.cnh}
						items={[
							{ label: "A", value: "A" },
							{ label: "B", value: "B" },
							{ label: "AB", value: "AB" },
							{ label: "C", value: "C" },
							{ label: "D", value: "D" },
							{ label: "E", value: "E" },
						]}
					/>
				</View>

				<View className="w-full flex-row gap-4 my-[20px]">
					<ButtonPadrao
						title="Cancelar"
						typeButton="normal"
						classname="flex-1"
						onPress={() => navigation.goBack()}
					/>
					<ButtonPadrao
						title="Salvar"
						typeButton="normal"
						classname="flex-1"
						onPress={handleSubmit(handleEditar)}
					/>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}

export default EditarPerfil;