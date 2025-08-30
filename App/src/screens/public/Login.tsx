import React from 'react'
import InputAuth from '@/src/components/form/InputAuth'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AlertNotificacao from '@/src/components/modal/AlertrNotificacao'
import useLoginUsuario from '@/src/hooks/post/loginUsuario'


type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function Login() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, handleLogin, rules, successVisible, closeSuccessNotification, notification, success } = useLoginUsuario()

	const handleNavigation = {
		Cadastro: () => navigation.navigate('Cadastro'),
		EsqueciSenha: () => navigation.navigate('EsqueciSenha'),
	}

	return (
		<SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#FFFFFF' }}>
			<KeyboardAwareScrollView
				contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
						config='password'
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
					status={success}
					messagem={notification}
					duration={1000}
					onDismiss={closeSuccessNotification}
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
		</SafeAreaView>
	)
}

export default Login;