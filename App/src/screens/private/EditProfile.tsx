import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import { BASE_URL } from '@env';
import { dataCnh } from '@/src/data/dataCnh';

import * as ImagePicker from 'expo-image-picker';
import DropDown from '@/src/components/form/DropDown';
import InputAuth from '@/src/components/form/InputAuth';
import AlertNotioncation from '@/src/components/modal/AlertNotioncation';
import { ButtonPadrao, ButtonUpload } from '@/src/components/form/Buttons';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useImageUser from '@/src/hooks/hookUser/useImageUser';
import useEditarUsuario from '@/src/hooks/hookUser/useEditUser';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import useEditImageUser from '@/src/hooks/hookUser/useEditImageUser';
import ErrorNotification from '@/src/components/modal/ErrorNotioncation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const avatarSize = 100;
const buttonsRowStyle = 'flex-row gap-2';
const formWrapperStyle = 'w-full flex-col gap-2.5';
const actionsRowStyle = 'w-full flex-row gap-4 my-[20px]';
const imageModalCloseStyle = 'absolute top-10 right-10 z-10';
const avatarFallbackTextStyle = 'font-bold text-black text-3xl';
const avatarContainerStyle = 'flex-col gap-3 justify-center items-center pb-5';
const avatarFallbackWrapperStyle = 'h-24 w-24 rounded-full bg-gray-200 items-center justify-center';

const EditProfile = () => {
	
	const navigation = useNavigation<NavigationProp>();
	const { iniciasNomeUsuario, userData, getUserData } = useGetUserData();
	const { control, handleSubmit, rules, setValue, handleEditar, successVisible, closeSuccessNotification, notification, success, } = useEditarUsuario();

	const { uploadImage, loading, statusSuccess } = useImageUser();
	const { updateImage, loadingUpdate, statusSuccessUpdate } = useEditImageUser();

	const [saving, setSaving] = useState(false);
	const savingLabel = saving ? 'Salvando...' : 'Salvar';
	const disableSave = saving || loading || loadingUpdate;
	const [modalImageVisible, setModalImageVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const imagemUrl = useMemo(
		() => (userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''),
		[userData?.imagemUsuario?.imgUrl]
	);

	const requestPermission = useCallback(async (type: 'camera' | 'gallery') => {
		if (type === 'camera') {
			const result = await ImagePicker.requestCameraPermissionsAsync();
			return result.granted;
		}
		const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
		return result.granted;
	}, []);

	const pickOrTakeImage = useCallback(
		async (type: 'camera' | 'gallery') => {
			const hasPermission = await requestPermission(type);
			if (!hasPermission) {
				alert(type === 'camera' ? 'Permissão para acessar a câmera é necessária!' : 'Permissão para acessar a galeria é necessária!');
				return null;
			}

			const pickerFn =
				type === 'camera'
					? ImagePicker.launchCameraAsync
					: ImagePicker.launchImageLibraryAsync;

			const result = await pickerFn({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
			});

			if (!result.canceled && result.assets?.length) return result.assets[0].uri;
			return null;
		},
		[requestPermission]
	);

	const handlePickImage = useCallback(async () => {
		const uri = await pickOrTakeImage('gallery');
		if (uri) setSelectedImage(uri);
	}, [pickOrTakeImage]);

	const handleTakePhoto = useCallback(async () => {
		const uri = await pickOrTakeImage('camera');
		if (uri) setSelectedImage(uri);
	}, [pickOrTakeImage]);

	const persistForm = useCallback(
		async (imagemUsuarioId: string | null) => {
			if (imagemUsuarioId) setValue('imagemUsuario_id', String(imagemUsuarioId));
			await handleSubmit(async (data) => {
				await handleEditar(data);
			})();
		},
		[handleEditar, handleSubmit, setValue]
	);

	const handleSave = useCallback(async () => {
		setSaving(true);
		try {
			let imagemUsuarioId: string | null = null;
			let imagemError = false;

			if (selectedImage && selectedImage !== imagemUrl) {
				const idAtual = userData?.imagemUsuario?.id_imagem;
				if (idAtual && imagemUrl) {
					await updateImage(String(idAtual), selectedImage);
					if (statusSuccessUpdate === false) imagemError = true;
					imagemUsuarioId = String(idAtual);
				} else {
					const idImagem = await uploadImage(selectedImage);
					if (!idImagem || statusSuccess === false) imagemError = true;
					imagemUsuarioId = idImagem ? String(idImagem) : null;
				}
			} else if (imagemUrl) {
				const idAtual = userData?.imagemUsuario?.id_imagem;
				imagemUsuarioId = idAtual ? String(idAtual) : null;
			}

			if (imagemError) return;
			await persistForm(imagemUsuarioId);
		} catch (error) {
			console.error(error);
		} finally {
			setSaving(false);
		}
	}, [imagemUrl, persistForm, selectedImage, statusSuccess, statusSuccessUpdate, updateImage, uploadImage, userData?.imagemUsuario?.id_imagem]);

	useEffect(() => {
		getUserData();
	}, [getUserData]);

	useEffect(() => {
		if (!userData) return;
		const fields: Record<string, string> = {
			nome: userData.nome ?? '',
			email: userData.email ?? '',
			cpf: userData.cpf ?? '',
			cnh: userData.cnh ?? '',
		};

		Object.entries(fields).forEach(([field, value]) => {
			setValue(field as any, value, { shouldDirty: false });
		});
	}, [userData, setValue]);


	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 10, flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				<AlertNotioncation
					visible={successVisible}
					status={success}
					messagem={notification}
					onDismiss={closeSuccessNotification}
					topOffset={10}
				/>

				<View className={avatarContainerStyle}>
					{selectedImage ? (
						<TouchableOpacity
							onPress={() => setSelectedImage(null)}
							accessibilityLabel='Remover nova imagem selecionada'
						>
							<Image
								source={{ uri: selectedImage }}
								style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
							/>
						</TouchableOpacity>
					) : imagemUrl ? (
						<TouchableOpacity
							onPress={() => setModalImageVisible(true)}
							accessibilityLabel='Ampliar imagem do perfil'
						>
							<Image
								source={{ uri: imagemUrl }}
								style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
							/>
						</TouchableOpacity>
					) : (
						<View className={avatarFallbackWrapperStyle}>
							<Text className={avatarFallbackTextStyle}>{iniciasNomeUsuario}</Text>
						</View>
					)}

					<Modal visible={modalImageVisible} transparent animationType='fade'>
						<TouchableWithoutFeedback onPress={() => setModalImageVisible(false)}>
							<View
								style={{
									flex: 1,
									backgroundColor: 'rgba(0,0,0,0.8)',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<TouchableOpacity
									className={imageModalCloseStyle}
									onPress={() => setModalImageVisible(false)}
									accessibilityLabel='Fechar visualização da imagem'
								>
									<Text className='text-white text-2xl'>✕</Text>
								</TouchableOpacity>
								<TouchableWithoutFeedback>
									<Image
										source={{ uri: imagemUrl }}
										style={{ minWidth: 100, minHeight: 100, width: 300, height: 300, borderRadius: 20 }}
										resizeMode='contain'
									/>
								</TouchableWithoutFeedback>
							</View>
						</TouchableWithoutFeedback>
					</Modal>

					<ErrorNotification
						loading={loading}
						statusSuccess={statusSuccess}
						loadingText='Carregando imagem...'
						successText='Imagem enviada com sucesso!'
						errorText='Erro ao enviar imagem.'
					/>
					<ErrorNotification
						loading={loadingUpdate}
						statusSuccess={statusSuccessUpdate}
						loadingText='Atualizando...'
						successText='Imagem atualizada com sucesso!'
						errorText='Erro ao atualizar imagem.'
					/>

					<View className={buttonsRowStyle}>
						<ButtonUpload
							onPress={handlePickImage}
							title='Alterar Foto'
							accessibilityLabel='Selecionar nova foto da galeria'
						/>
						<ButtonUpload
							onPress={handleTakePhoto}
							title='Tirar Foto'
							accessibilityLabel='Tirar foto com a câmera'
						/>
					</View>
				</View>

				<View className={formWrapperStyle}>
					<InputAuth
						id='nome'
						name='nome'
						label='Nome'
						placeholder='Nome completo'
						control={control}
						rules={rules.nome}
						type='default'
					/>
					<InputAuth
						id='email'
						name='email'
						label='Email'
						placeholder='Email'
						desabilitar
						statusInput='error'
						control={control}
						rules={rules.email}
						type='email-address'
					/>
					<InputAuth
						id='cpf'
						name='cpf'
						label='CPF'
						placeholder='CPF'
						control={control}
						rules={rules.cpf}
						config='cpf'
						type='number-pad'
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

				<View className={actionsRowStyle}>
					<ButtonPadrao
						title='Cancelar'
						typeButton='normal'
						classname='flex-1'
						onPress={() => navigation.goBack()}
						accessibilityLabel='Cancelar edição e voltar'
					/>
					<ButtonPadrao
						title={savingLabel}
						typeButton='normal'
						classname='flex-1'
						onPress={handleSave}
						disabled={disableSave}
						accessibilityLabel='Salvar alterações do perfil'
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default memo(EditProfile);
