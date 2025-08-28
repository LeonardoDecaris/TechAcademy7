import React from 'react'
import InputAuth from '@/src/components/form/InputAuth'
import { Text, TouchableOpacity, View } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useHookLogin from '@/src/hooks/post/loginUsuario'
import AlertNotificacao from '@/src/components/modal/AlertrNotificacao'


type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function Login() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, handleLogin, rules, successVisible, Notificacao, Status, onSuccessDismiss } = useHookLogin()

	const handleNavigation = {
		Cadastro: () => navigation.navigate('Cadastro'),
		EsqueciSenha: () => navigation.navigate('EsqueciSenha'),
	}

	return (
			
			<KeyboardAwareScrollView
				contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				className='px-5 bg-white'
			>
				<View className='mb-10 '>
					<Text className='text-[48px] text-black text-center font-bold'>Login</Text>
					<Text className='text-center text-sm text-black/80 font-medium'>É hora de começar</Text>
				</View>

				<View className='w-full flex-col gap-2.5'>
					<InputAuth
						control={control}
						name="email"
						id='email'
						placeholder='Email'
						label='Email'
						rules={rules.email}
					/>
					<InputAuth
						control={control}
						name="password"
						id='password'
						placeholder='Senha'
						label='Senha'
						secureTextEntry={true}
						rules={rules.password}
					/>
				</View>

				<ButtonPadrao
					title='Entrar'
					onPress={handleSubmit(handleLogin)}
					typeButton='normal'
					classname='w-full my-[20px]'
				/>
				<AlertNotificacao
					visible={successVisible}
					status={Status}
					messagem={Notificacao}
					duration={1000}
					onDismiss={onSuccessDismiss}
				/>

				<View className='w-full flex-row justify-between'>
					<TouchableOpacity onPress={handleNavigation.Cadastro}>
						<Text className='font-medium'>Cadastre-se</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={handleNavigation.EsqueciSenha}>
						<Text className='font-medium'>Esqueceu a senha?</Text>
					</TouchableOpacity>
				</View>

			</KeyboardAwareScrollView>
	)
}

export default Login;