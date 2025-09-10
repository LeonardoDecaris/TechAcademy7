import React, { memo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import InputAuth from '@/src/components/form/InputAuth';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import useForgotPassword from '@/src/hooks/hookAuth/useForgotPassword';
import AlertNotioncation from '@/src/components/modal/AlertNotioncation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const headerWrapperStyle = 'mb-10';
const formWrapperStyle = 'w-full flex-col gap-1.5';
const footerWrapperStyle = 'w-full flex-row justify-end';
const pageTitleStyle = 'text-6xl text-black text-center font-bold';
const pageSubtitleStyle = 'text-center text-base text-black/80 font-medium';

const ForgotPassword = () => {
	const navigation = useNavigation<NavigationProp>();
	const { control, handleSubmit, rules, handleForgotPassword, success, notification, successVisible, closeSuccessNotification, showTokenField } = useForgotPassword();
	const insets = useSafeAreaInsets();

	const goStart = useCallback(() => navigation.navigate('Start'), [navigation]);
	const onSubmit = useCallback(() => handleSubmit(handleForgotPassword)(), [handleSubmit, handleForgotPassword]);

	return (
		<KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#FFFFFF' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 10, paddingTop: insets.top }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				<View className={headerWrapperStyle}>
					<Text className={pageTitleStyle}>Esqueci Minha Senha</Text>
					<Text className={pageSubtitleStyle}>Vamos redefinir sua senha</Text>
				</View>

				<View className={formWrapperStyle}>
					{showTokenField && (
						<InputAuth
							id='token'
							name='token'
							label='Token'
							placeholder='Token recebido'
							control={control}
							rules={rules.token}
						/>
					)}
					<InputAuth
						id='password'
						name='password'
						label='Nova Senha'
						placeholder='Nova Senha'
						secureTextEntry
						control={control}
						rules={rules.password}
						config='password'
					/>
					<InputAuth
						id='confirmaSenha'
						name='confirmaSenha'
						label='Confirme a Senha'
						placeholder='Confirme a senha'
						control={control}
						secureTextEntry
						rules={rules.confirmaSenha}
						config='password'
					/>
				</View>

				<ButtonPadrao
					title='Redefinir'
					typeButton='normal'
					classname='w-full my-[20px]'
					onPress={onSubmit}
				/>

				<View className={footerWrapperStyle}>
					<TouchableOpacity onPress={goStart}>
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
	);
};

export default memo(ForgotPassword);

