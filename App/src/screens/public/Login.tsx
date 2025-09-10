import React from 'react'
import { Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import useLogin from '@/src/hooks/hookAuth/useLogin'
import InputAuth from '@/src/components/form/InputAuth'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import AlertNotioncation from '@/src/components/modal/AlertNotioncation'


type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function Login() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, handleLogin, rules, successVisible, closeSuccessNotification, mensage, success } = useLogin()
	const insets = useSafeAreaInsets();

	const handleNavigation = {
		SignUp: () => navigation.navigate('SignUp'),
		RequestNewpassword: () => navigation.navigate('RequestNewpassword'),
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 10, paddingTop: insets.top }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<AlertNotioncation
					visible={successVisible}
					status={success}
					messagem={mensage}
					onDismiss={closeSuccessNotification}
				/>

				<View className='w-full mb-10 flex-col items-center'>
					<Text className='text-7xl h-[76px] text-black text-center font-bold '>Login</Text>
					<Text className='text-center text-base text-black/80 font-medium'>É hora de começar</Text>
				</View>

				<View className='w-full flex-col gap-1.5 '>
					<InputAuth
						control={control}
						name="email"
						id='email'
						placeholder='exemplo@exemplo.com'
						label='Email'
						rules={rules.email}
						type="email-address"
					/>
					<InputAuth
						control={control}
						name="password"
						id='password'
						config='password'
						placeholder='Digite sua senha'
						label='Senha'
						secureTextEntry={true}
						rules={rules.password}
						type="default"
					/>
				</View>

				<ButtonPadrao
					title='Entrar'
					onPress={handleSubmit(handleLogin)}
					typeButton='normal'
					classname='w-full my-[20px]'
				/>

				<View className='w-full flex-row justify-between'>
					<TouchableOpacity onPress={handleNavigation.SignUp}>
						<Text className='font-medium'>Cadastre-se</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={handleNavigation.RequestNewpassword}>
						<Text className='font-medium'>Esqueceu a senha?</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default Login;