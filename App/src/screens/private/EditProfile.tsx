import React, { useEffect } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { BASE_URL } from '@env';
import { useAuth } from "@/src/context/AuthContext";


import DropDown from "@/src/components/form/DropDown";
import InputAuth from "@/src/components/form/InputAuth";
import AlertNotioncation from "@/src/components/modal/AlertNotioncation";
import { ButtonPadrao, ButtonUpload } from "@/src/components/form/Buttons";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/Routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useEditarUsuario from "@/src/hooks/put/useEditUser";
import useGetUserData from "@/src/hooks/get/useGetUserData";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function EditProfile() {
	const navigation = useNavigation<NavigationProp>();
	
	const { userId } = useAuth();
	const { iniciasNomeUsuario, userData, getUserData } = useGetUserData();
	const { control, handleSubmit, rules, setValue, handleEditar, successVisible, closeSuccessNotification, notification, success } = useEditarUsuario(userId ?? "");
	const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''

	useEffect(() => {
		getUserData();
	}, [getUserData]);

	useEffect(() => {
		if (userData) {
			setValue("nome", userData.nome || "");
			setValue("email", userData.email || "");
			setValue("cpf", userData.cpf || "");
			setValue("cnh", userData.cnh || "");
		}
	}, [userData, setValue]);

	return (
		<SafeAreaView className="flex-1 bg-white px-5">
			<KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 20 }} enableOnAndroid={true}>
				<AlertNotioncation
					visible={successVisible}
					status={success}
					messagem={notification}
					duration={1100}
					onDismiss={closeSuccessNotification}
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
								{iniciasNomeUsuario}
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
						type="default"
					/>
					<InputAuth
						id="email"
						name="email"
						label="Email"
						placeholder="Email"
						desabilitar={true}
						control={control}
						rules={rules.email}
						type="email-address"
					/>
					<InputAuth
						id="cpf"
						name="cpf"
						label="CPF"
						placeholder="CPF"
						control={control}
						rules={rules.cpf}
						config="cpf"
						type="number-pad"
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

export default EditProfile;