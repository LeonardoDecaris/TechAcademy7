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
		<View style={{ flexGrow: 1,backgroundColor: '#FFFFFF', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
			<View className='mb-10'>
				<Text className='font-bold text-center text-6xl'>Bem Vindo</Text>
				<Text className='text-center text-base font-medium'>Vamos começar</Text>
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
		</View>

	)
}

export default Start;