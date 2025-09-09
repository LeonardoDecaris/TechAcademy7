import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TouchableOpacity, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'

import InputAuth from '@/src/components/form/InputAuth'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AlertNotioncation from '@/src/components/modal/AlertNotioncation'
import useForgotPassword from '@/src/hooks/hookAuth/hookUser/useForgotPassword'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function ForgotPassword() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, rules, handleForgotPassword, success, notification, successVisible, closeSuccessNotification, showTokenField, } = useForgotPassword()
	const insets = useSafeAreaInsets();

	const styleSubTitle = 'text-center text-base text-black/80 font-medium';
	const styleTitle = 'text-6xl text-black text-center font-bold';

	const handleNavigation = {
		start: () => navigation.navigate('Start')
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: '#FFFFFF' }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 10, paddingTop: insets.top }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<View className='mb-10'>
					<Text className={styleTitle}>Esqueci Minha Senha</Text>
					<Text className={styleSubTitle}>Vamos redefinir sua senha</Text>
				</View>

				<View className='w-full flex-col gap-1.5'>
					{showTokenField && (
						<InputAuth
							id='token'
							name="token"
							label='Token'
							placeholder='Token recebido'
							control={control}
							rules={rules.token}
						/>
					)}

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
					onPress={handleSubmit(handleForgotPassword)}
				/>

				<View className='w-full flex-row justify-end'>
					<TouchableOpacity onPress={handleNavigation.start}>
						<Text className='font-medium'>Voltar para o inicio</Text>
					</TouchableOpacity>
				</View>

				<AlertNotioncation
					visible={successVisible}
					status={success}
					messagem={notification}
					onDismiss={closeSuccessNotification}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default ForgotPassword;

