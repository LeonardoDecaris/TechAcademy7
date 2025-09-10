import React from 'react'

import { TouchableOpacity, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'

import InputAuth from '@/src/components/form/InputAuth'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AlertNotioncation from '@/src/components/modal/AlertNotioncation'
import useRequestNewpassword from '@/src/hooks/hookAuth/useRequestNewpassword'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function RequestNewPassword() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, rules, handleRequestNewPassword, closeSuccessNotification, success, successVisible, notification } = useRequestNewpassword()
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
					<Text className={styleTitle}>Solicitar Nova Senha</Text>
					<Text className={styleSubTitle}>Vamos redefinir sua senha</Text>
				</View>

				<View className='w-full flex-col gap-1.5'>

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
						id='cpf'
						name="cpf"
						label='CPF'
						placeholder='CPF'
						config="cpf"
						control={control}
						rules={rules.cpf}
						type="number-pad"
					/>
				</View>

				<ButtonPadrao
					title='Solicitar'
					typeButton='normal'
					classname='w-full my-[20px]'
					onPress={handleSubmit(handleRequestNewPassword)}
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

export default RequestNewPassword;

