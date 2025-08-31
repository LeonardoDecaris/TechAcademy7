import React from 'react'

import { TouchableOpacity } from 'react-native'
import { SafeAreaView, Text, View } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import InputAuth from '@/src/components/form/InputAuth'
import { useNavigation } from '@react-navigation/native'
import useEsqueciSenha from '@/src/hooks/post/esqueciSenha'
import { RootStackParamList } from '@/src/navigation/Routes'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AlertNotificacao from '@/src/components/modal/AlertrNotificacao'
type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function EsqueciSenha() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, rules, handleResetPassword, success, notification, successVisible, closeSuccessNotification,  } = useEsqueciSenha()

	const styleSubTitle = 'text-center text-sm text-black/80 font-medium';
	const styleTitle = 'text-[48px] text-black text-center font-bold';

	const handleNavigation = {
		start: () => navigation.navigate('Start')
	}

	return (
		<SafeAreaView className='flex-1 bg-white px-5'>
			<KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

				<View className='mb-10'>
					<Text className={styleTitle}>Redefinir Senha</Text>
					<Text className={styleSubTitle}>Vamos redefinir sua senha</Text>
				</View>

				<View className='w-full flex-col gap-2.5'>

					<InputAuth
						id='password'
						name="password"
						label='Nova Senha'
						placeholder='Nova Senha'
						secureTextEntry={true}
						control={control}
						rules={rules.password}
						config='password'
					/>

					<InputAuth
						id='confirmaSenha'
						name="confirmaSenha"
						label='Confirme a Senha'
						placeholder='Confirme a senha'
						control={control}
						secureTextEntry={true}
						rules={rules.confirmaSenha}
						config='password'
					/>
				</View>

				<ButtonPadrao
					title='Redefinir'
					typeButton='normal'
					classname='w-full my-[20px]'
					onPress={handleSubmit(handleResetPassword)}
				/>

				<AlertNotificacao
					visible={successVisible}
					status={success}
					messagem={notification}
					duration={1100}
					onDismiss={closeSuccessNotification}
				/>

			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}

export default EsqueciSenha;

