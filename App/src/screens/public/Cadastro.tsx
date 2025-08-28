import React from 'react'

import { Text, View } from 'react-native'
import InputAuth from '@/src/components/form/InputAuth'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import useHookRegister from '@/src/hooks/post/cadastroUsuario'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AlertNotificacao from '@/src/components/modal/AlertrNotificacao'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function Cadastro() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, rules, handleCadastro, Notificacao, Status, successVisible, onSuccessDismiss } = useHookRegister()

	const styleSubTitle = 'text-center text-sm text-black/80 font-medium';
	const styleTitle = 'text-[48px] text-black text-center font-bold';

	const handleNavigation = {
		login: () => navigation.navigate('Login')
	}

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: 'white' }} >

				<View className='mb-10'>
					<Text className={styleTitle}>Cadastre-se</Text>
					<Text className={styleSubTitle}>Vamos começar</Text>
				</View>

				<View className='w-full flex flex-col gap-2.5'>

					   <InputAuth
						   id='nome'
						   name="nome"
						   label='Nome'
						   placeholder='Nome completo'
						   control={control}
						   rules={rules.nome}
					   />

					   <InputAuth
						   id='cpf'
						   name="cpf"
						   label='CPF'
						   placeholder='CPF'
						   control={control}
						   rules={rules.cpf}
					   />
					   <InputAuth
						   id='email'
						   name="email"
						   label='Email'
						   placeholder='Email'
						   control={control}
						   rules={rules.email}
					   />
					   <InputAuth
						   id='password'
						   name="password"
						   label='Senha'
						   placeholder='Senha'
						   secureTextEntry={true}
						   control={control}
						   rules={rules.password}
					   />
					   <InputAuth
						   id='confirmaSenha'
						   name="confirmaSenha"
						   label='Confirme a Senha'
						   placeholder='Confirme a senha'
						   control={control}
						   secureTextEntry={true}
						   rules={rules.confirmaSenha}
					   />
					   <InputAuth
						   id='cnh'
						   name="cnh"
						   label='CNH'
						   placeholder='CNH'
						   control={control}
						   rules={rules.cnh}
					   />

				</View>

				<ButtonPadrao
					title='Cadastrar'
					typeButton='normal'
					classname='w-full my-[20px]'
					onPress={handleSubmit(handleCadastro)}
				/>
				<AlertNotificacao
					visible={successVisible}
					status={Status}
					messagem={Notificacao}
					duration={1500}
					onDismiss={onSuccessDismiss}
				/>

				<View className='w-full flex-row justify-end'>
					<TouchableOpacity onPress={handleNavigation.login}>
						<Text className='font-medium'>Já tenho uma conta</Text>
					</TouchableOpacity>
				</View>

		</KeyboardAwareScrollView>
	)
}

export default Cadastro;

