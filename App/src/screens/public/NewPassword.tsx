import React from 'react'

import { Text, View } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import InputAuth from '@/src/components/form/InputAuth'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useForgotPassword from '@/src/hooks/hookAuth/useForgotPassword'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function NewPassword() {
	const { control, handleSubmit, rules, handleForgotPassword, loading } = useForgotPassword()

	const styleSubTitle = 'text-center text-sm text-black/80 font-medium';
	const styleTitle = 'text-[48px] text-black text-center font-bold';

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#FFFFFF', paddingTop: 60 }} showsVerticalScrollIndicator={false}>

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
				loading={loading}
			/>


		</KeyboardAwareScrollView>
	)
}

export default NewPassword;

