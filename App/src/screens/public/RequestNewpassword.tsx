import React, { memo, useCallback } from 'react';
import { TouchableOpacity, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import InputAuth from '@/src/components/form/InputAuth';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AlertNotioncation from '@/src/components/modal/AlertNotioncation';
import useRequestNewpassword from '@/src/hooks/hookAuth/useRequestNewpassword';
import AlertNotification from '@/src/components/modal/AlertNotification';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const headerWrapperStyle = 'mb-10';
const formWrapperStyle = 'w-full flex-col gap-1.5';
const footerWrapperStyle = 'w-full flex-row justify-end';
const pageTitleStyle = 'text-6xl text-black text-center font-bold';
const pageSubtitleStyle = 'text-center text-base text-black/80 font-medium';

const RequestNewPassword = () => {
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<NavigationProp>();
	const { control, handleSubmit, rules, handleRequestNewPassword, status, message, closeNotification, notificationVisible } = useRequestNewpassword();

	const goStart = useCallback(() => navigation.navigate('Start'), [navigation]);
	const onSubmit = useCallback(() => handleSubmit(handleRequestNewPassword)(), [handleSubmit, handleRequestNewPassword]);

	return (
		<KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#FFFFFF' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 10, paddingTop: insets.top }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				<AlertNotification
					visible={notificationVisible}
					status={status as "success" | "error" | "loading"}
					messagem={message}
					onDismiss={closeNotification}
				/>

				<View className={headerWrapperStyle}>
					<Text className={pageTitleStyle}>Solicitar Nova Senha</Text>
					<Text className={pageSubtitleStyle}>Vamos redefinir sua senha</Text>
				</View>

				<View className={formWrapperStyle}>
					<InputAuth
						id='email'
						name='email'
						label='Email'
						placeholder='exemplo@exemplo.com'
						control={control}
						rules={rules.email}
						type='email-address'
					/>
					<InputAuth
						id='cpf'
						name='cpf'
						label='CPF'
						placeholder='CPF'
						config='cpf'
						control={control}
						rules={rules.cpf}
						type='number-pad'
					/>
				</View>

				<ButtonPadrao
					title='Solicitar'
					typeButton='normal'
					classname='w-full my-[20px]'
					onPress={onSubmit}
				/>

				<View className={footerWrapperStyle}>
					<TouchableOpacity onPress={goStart}>
						<Text className='font-medium'>Voltar para o inicio</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default memo(RequestNewPassword);

