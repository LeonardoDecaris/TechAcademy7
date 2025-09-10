import React, { useCallback, memo } from 'react';
import { View, Text } from 'react-native';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const headingWrapperStyle = 'mb-10';
const actionsWrapperStyle = 'w-full flex-col gap-4';
const headingStyle = 'font-bold text-center text-6xl';
const subHeadingStyle = 'text-center text-base font-medium';
const containerStyle = 'flex-1 px-2.5 justify-center items-center';

const Start = () => {
	const navigation = useNavigation<NavigationProp>();

	const goLogin = useCallback(() => navigation.navigate('Login'), [navigation]);
	const goSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);

	return (
		<View className={containerStyle}>
			<View className={headingWrapperStyle}>
				<Text className={headingStyle}>Bem Vindo</Text>
				<Text className={subHeadingStyle}>Vamos começar</Text>
			</View>
			<View className={actionsWrapperStyle}>
				<ButtonPadrao
					title="Login"
					typeButton="normal"
					classname="w-full"
					onPress={goLogin}
				/>
				<ButtonPadrao
					title="Cadastrar"
					typeButton="normal"
					classname="w-full"
					onPress={goSignUp}
				/>
			</View>
		</View>
	);
};

export default memo(Start);