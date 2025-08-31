import React from 'react'

import { TouchableOpacity } from 'react-native'
import { SafeAreaView, Text, View } from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import InputAuth from '@/src/components/form/InputAuth'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useSolicitarNovaSenha from '@/src/hooks/post/solicitarNovasenha'
import AlertNotificacao from '@/src/components/modal/AlertrNotificacao'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function SolicitarNovaSenha() {
	const navigation = useNavigation<NavigationProp>()
	const { control, handleSubmit, rules, handleSolicitarNovaSenha, closeSuccessNotification, success , successVisible, notification} = useSolicitarNovaSenha()

	const styleSubTitle = 'text-center text-sm text-black/80 font-medium';
	const styleTitle = 'text-[48px] text-black text-center font-bold';

	const handleNavigation = {
		start: () => navigation.navigate('Start')
	}

	return (
		<SafeAreaView className='flex-1 bg-white px-5'>
			<KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

				<View className='mb-10'>
					<Text className={styleTitle}>Solicitar Nova Senha</Text>
					<Text className={styleSubTitle}>Vamos redefinir sua senha</Text>
				</View>

				<View className='w-full flex-col gap-2.5'>

                <InputAuth
                    id='email'
                    name="email"
                    label='Email'
                    placeholder='Email'
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
					onPress={handleSubmit(handleSolicitarNovaSenha)}
				/>

				<View className='w-full flex-row justify-end'>
					<TouchableOpacity onPress={handleNavigation.start}>
						<Text className='font-medium'>Voltar para o inicio</Text>
					</TouchableOpacity>
				</View>

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

export default SolicitarNovaSenha;

