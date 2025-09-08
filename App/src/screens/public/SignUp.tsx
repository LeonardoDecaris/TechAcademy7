import React from "react";

import { TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
// A importação do SafeAreaView não é mais necessária se você usa insets
// import { SafeAreaView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import useSignUp from "@/src/hooks/post/useSignUp";
import DropDown from "@/src/components/form/DropDown";
import InputAuth from '@/src/components/form/InputAuth'
import { ButtonPadrao } from '@/src/components/form/Buttons';
import AlertNotioncation from '@/src/components/modal/AlertNotioncation'
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function SignUp() {

	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, rules, handleSignUp, closeSuccessNotification, success, successVisible, notification } = useSignUp()
	const insets = useSafeAreaInsets();
	const styleSubTitle = "text-center text-sm text-black/80 font-medium";
	const styleTitle = "text-6xl text-black text-center font-bold";

	const handleNavigation = {
		login: () => navigation.navigate("Login"),
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, paddingTop: insets.top, justifyContent: 'center' }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<View className='mb-10'>
					<Text className={styleTitle}>Cadastre-se</Text>
					<Text className={styleSubTitle}>Vamos começar</Text>
				</View>

				<View className='w-full flex flex-col gap-1.5'>

					<InputAuth
						id='nome'
						name="nome"
						label='Nome completo'
						placeholder='Nome completo'
						control={control}
						rules={rules.nome}
						type="default"
					/>

					<InputAuth
						id='cpf'
						name="cpf"
						label='CPF'
						placeholder='CPF'
						config="cpf"
						control={control}
						rules={rules.cpf}
						type="number-pad"
					/>
					<InputAuth
						id='email'
						name="email"
						label='Email'
						placeholder='exemplo@exemplo.com'
						control={control}
						rules={rules.email}
						type="email-address"
					/>
					<InputAuth
						id='password'
						name="password"
						label='Senha'
						placeholder='Digite a senha'
						config="password"
						secureTextEntry={true}
						control={control}
						rules={rules.password}
						type="default"
					/>
					<InputAuth
						id='confirmaSenha'
						name="confirmaSenha"
						label='Confirme a Senha'
						placeholder='Confirme a senha'
						config="password"
						control={control}
						secureTextEntry={true}
						rules={rules.confirmaSenha}
						type="default"
					/>
					<DropDown
						name="cnh"
						label="Tipo de CNH"
						placeholder="Selecione o tipo de CNH"
						control={control}
						rules={{ required: "Selecione o tipo de CNH" }}
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

				<ButtonPadrao
					title='Cadastrar'
					typeButton='normal'
					classname='w-full my-[20px]'
					onPress={handleSubmit(handleSignUp)}
				/>
				<AlertNotioncation
					visible={successVisible}
					status={success}
					messagem={notification}
					onDismiss={closeSuccessNotification}
				/>

				<View className='w-full flex-row justify-end'>
					<TouchableOpacity onPress={handleNavigation.login}>
						<Text className='font-medium'>Já tenho uma conta</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default SignUp;
