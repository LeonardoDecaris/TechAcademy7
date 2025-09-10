import React, { memo, useCallback } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { dataCnh } from '@/src/data/dataCnh';
import DropDown from '@/src/components/form/DropDown';
import useSignUp from '@/src/hooks/hookAuth/useSignUp';
import InputAuth from '@/src/components/form/InputAuth';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AlertNotioncation from '@/src/components/modal/AlertNotioncation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const headerWrapperStyle = 'mb-10';
const formWrapperStyle = 'w-full flex flex-col gap-1.5';
const footerWrapperStyle = 'w-full flex-row justify-end';
const pageTitleStyle = 'text-6xl text-black text-center font-bold';
const pageSubtitleStyle = 'text-center text-sm text-black/80 font-medium';

const SignUp = () => {
	
	const insets = useSafeAreaInsets();
	const navigation = useNavigation<NavigationProp>();
	const { control, handleSubmit, rules, handleSignUp, closeSuccessNotification, success, successVisible, notification } = useSignUp();
	
	const goLogin = useCallback(() => navigation.navigate('Login'), [navigation]);
	const onSubmit = useCallback(() => handleSubmit(handleSignUp)(), [handleSubmit, handleSignUp]);

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, paddingTop: insets.top, justifyContent: 'center' }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<View className={headerWrapperStyle}>
					<Text className={pageTitleStyle}>Cadastre-se</Text>
					<Text className={pageSubtitleStyle}>Vamos começar</Text>
				</View>

				<View className={formWrapperStyle}>
					<InputAuth
						id='nome'
						name='nome'
						label='Nome completo'
						placeholder='Nome completo'
						control={control}
						rules={rules.nome}
						type='default'
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
						id='password'
						name='password'
						label='Senha'
						placeholder='Digite a senha'
						config='password'
						secureTextEntry
						control={control}
						rules={rules.password}
						type='default'
					/>
					<InputAuth
						id='confirmaSenha'
						name='confirmaSenha'
						label='Confirme a Senha'
						placeholder='Confirme a senha'
						config='password'
						control={control}
						secureTextEntry
						rules={rules.confirmaSenha}
						type='default'
					/>
					<DropDown
						name='cnh'
						label='Tipo de CNH'
						placeholder='Selecione o tipo de CNH'
						control={control}
						rules={rules.cnh}
						items={dataCnh}
					/>
				</View>

				<ButtonPadrao
					title='Cadastrar'
					typeButton='normal'
					classname='w-full my-[20px]'
					onPress={onSubmit}
				/>
				<AlertNotioncation
					visible={successVisible}
					status={success}
					messagem={notification}
					onDismiss={closeSuccessNotification}
				/>
				<View className={footerWrapperStyle}>
					<TouchableOpacity onPress={goLogin}>
						<Text className='font-medium'>Já tenho uma conta</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default memo(SignUp);
