import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useLogin from '@/src/hooks/hookAuth/useLogin';
import InputAuth from '@/src/components/form/InputAuth';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import AlertNotification from '@/src/components/modal/AlertNotification';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const formWrapperStyle = 'w-full flex-col gap-1.5';
const footerWrapperStyle = 'w-full flex-row justify-between';
const headerWrapperStyle = 'w-full mb-10 flex-col items-center';
const titleStyle = 'text-7xl h-[76px] text-black text-center font-bold';
const subtitleStyle = 'text-center text-base text-black/80 font-medium';

const Login = () => {

	const insets = useSafeAreaInsets();
	const navigation = useNavigation<NavigationProp>();
	const { control, handleSubmit, handleLogin, rules, successVisible, closeSuccessNotification, mensage, success, isDisabled } = useLogin();

	const goSignUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);
	const goForgotPassword = useCallback(() => navigation.navigate('RequestNewpassword'), [navigation]);
	const onSubmit = useCallback(() => handleSubmit(handleLogin)(), [handleSubmit, handleLogin]);

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 10, paddingTop: insets.top }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>

				<AlertNotification
					visible={successVisible}
					status={success as "success" | "error" | "loading"}
					messagem={mensage}
					onDismiss={closeSuccessNotification}
				/>

				<View className={headerWrapperStyle}>
					<Text className={titleStyle}>Login</Text>
					<Text className={subtitleStyle}>É hora de começar</Text>
				</View>

				<View className={formWrapperStyle}>
					<InputAuth
						control={control}
						name='email'
						id='email'
						placeholder='exemplo@exemplo.com'
						label='Email'
						rules={rules.email}
						type='email-address'
					/>
					<InputAuth
						control={control}
						name='password'
						id='password'
						config='password'
						placeholder='Digite sua senha'
						label='Senha'
						secureTextEntry
						rules={rules.password}
						type='default'
					/>
				</View>

				<ButtonPadrao
					title='Entrar'
					onPress={onSubmit}
					typeButton='normal'
					classname='w-full my-[20px]'
					disabled={isDisabled}
				/>

				<View className={footerWrapperStyle}>
					<TouchableOpacity onPress={goSignUp}>
						<Text className='font-medium'>Cadastre-se</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={goForgotPassword}>
						<Text className='font-medium'>Esqueceu a senha?</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default memo(Login);