import React from 'react'

import { View, Text, SafeAreaView} from 'react-native'
import { ButtonPadrao } from '@/src/components/form/Buttons'

import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

function Start() {
	const navigation = useNavigation<NavigationProp>()

	const handleNavigation = {
		Login: () => navigation.navigate('Login'),
		SignUp: () => navigation.navigate('SignUp'),
	}

	return (
		<SafeAreaView className='flex-1 justify-center items-center bg-white px-5'>
			<View className='mb-10'>
				<Text className='font-bold text-center text-5xl'>Bem Vindo</Text>
				<Text className='text-center text-sm font-medium'>Vamos começar</Text>
			</View>

			<View className='w-full flex-col gap-4'>
				<ButtonPadrao
					title="Login"
					typeButton="normal"
					classname="w-full"
					onPress={handleNavigation.Login}
				/>
				<ButtonPadrao
					title="Cadastrar"
					typeButton="normal"
					classname="w-full"
					onPress={handleNavigation.SignUp}
				/>
			</View>
		</SafeAreaView>

	)
}

export default Start;