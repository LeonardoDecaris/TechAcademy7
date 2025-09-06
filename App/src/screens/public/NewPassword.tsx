import React from 'react'

import { SafeAreaView, Text, View } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import InputAuth from '@/src/components/form/InputAuth'
import AlertNotioncation from '@/src/components/modal/AlertNotioncation'
import useForgotPassword from '@/src/hooks/post/useForgotPassword'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function NewPassword() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, rules, handleForgotPassword, success, notification, successVisible, closeSuccessNotification, } = useForgotPassword()

	const styleSubTitle = 'text-center text-sm text-black/80 font-medium';
	const styleTitle = 'text-[48px] text-black text-center font-bold';
	const insets = useSafeAreaInsets();

	

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, backgroundColor: '#FFFFFF', paddingTop: insets.top, }}
			enableOnAndroid
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
		>

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
				onPress={handleSubmit(handleForgotPassword)}
			/>

			<AlertNotioncation
				visible={successVisible}
				status={success}
				messagem={notification}
				onDismiss={closeSuccessNotification}
			/>

		</KeyboardAwareScrollView>
	)
}

export default NewPassword;

