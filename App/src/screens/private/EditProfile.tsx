import React, { useEffect, useState } from 'react';
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

import useImageUser from '@/src/hooks/hookAuth/hookUser/useImageUser';
import useEditarUsuario from '@/src/hooks/hookAuth/hookUser/useEditUser';
import useGetUserData from '@/src/hooks/hookAuth/hookUser/useGetUserData';
import useEditImageUser from '@/src/hooks/hookAuth/hookUser/useEditImageUser';
import ErrorNotification from '@/src/components/modal/ErrorNotioncation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function EditProfile() {
	const navigation = useNavigation<NavigationProp>();

	const { iniciasNomeUsuario, userData, getUserData } = useGetUserData();
	const { control, handleSubmit, rules, setValue, handleEditar, successVisible, closeSuccessNotification, notification, success, } = useEditarUsuario();

	const { uploadImage, loading, statusSuccess } = useImageUser();
	const { updateImage, loadingUpdate, statusSuccessUpdate } = useEditImageUser();

	const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : '';
	const [modalImageVisible, setModalImageVisible] = useState(false);

	const [saving, setSaving] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const requestPermission = async (type: 'camera' | 'gallery') => {
		if (type === 'camera') {
			const result = await ImagePicker.requestCameraPermissionsAsync();
			return result.granted;
		} else {
			const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
			return result.granted;
		}
	};

	const pickOrTakeImage = async (type: 'camera' | 'gallery') => {
		const hasPermission = await requestPermission(type);
		if (!hasPermission) {
			alert(
				type === 'camera'
					? 'Permissão para acessar a câmera é necessária!'
					: 'Permissão para acessar a galeria é necessária!'
			);
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

		if (!result.canceled && result.assets?.length) {
			return result.assets[0].uri;
		}
		return null;
	};

	const handlePickImage = async () => {
		const uri = await pickOrTakeImage('gallery');
		if (uri) setSelectedImage(uri);
	};

	const handleTakePhoto = async () => {
		const uri = await pickOrTakeImage('camera');
		if (uri) setSelectedImage(uri);
	};

	const handleSave = async () => {
		setSaving(true);
		try {
			let imagemUsuarioId = null;
			let imagemError = false;

			if (selectedImage && selectedImage !== imagemUrl) {
				const idAtual = userData?.imagemUsuario?.id_imagem;

				if (idAtual && imagemUrl) {
					await updateImage(String(idAtual), selectedImage);
					if (statusSuccessUpdate === false) imagemError = true;
					imagemUsuarioId = idAtual;
				} else {
					const idImagem = await uploadImage(selectedImage);
					if (!idImagem || statusSuccess === false) imagemError = true;
					imagemUsuarioId = idImagem;
				}
			} else if (imagemUrl) {
				const idAtual = userData?.imagemUsuario?.id_imagem;
				imagemUsuarioId = idAtual ?? null;
			}

			if (imagemError) {
				setSaving(false);
				return;
			}

			if (imagemUsuarioId) {
				setValue('imagemUsuario_id', String(imagemUsuarioId));
			}

			await handleSubmit(async (data) => {
				await handleEditar(data);
			})();

		} catch (error) {
			console.error(error);
		} finally {
			setSaving(false);
		}
	};

	useEffect(() => {
		getUserData();
	}, [getUserData]);

	useEffect(() => {
		if (userData) {
			setValue('nome', userData.nome || '');
			setValue('email', userData.email || '');
			setValue('cpf', userData.cpf || '');
			setValue('cnh', userData.cnh || '');
		}
	}, [userData, setValue]);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView
				contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 10, flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>

				<AlertNotioncation
					visible={successVisible}
					status={success}
					messagem={notification}
					onDismiss={closeSuccessNotification}
					topOffset={10}
				/>

				<View className="flex-col gap-3 justify-center items-center pb-5">
					{selectedImage ? (
						<TouchableOpacity onPress={() => setSelectedImage(null)}>
							<Image
								source={{ uri: selectedImage }}
								style={{ width: 100, height: 100, borderRadius: 50 }}
							/>
						</TouchableOpacity>
					) : imagemUrl ? (
						<TouchableOpacity onPress={() => setModalImageVisible(true)}>
							<Image
								source={{ uri: imagemUrl }}
								style={{ width: 100, height: 100, borderRadius: 50 }}
							/>
						</TouchableOpacity>
					) : (
						<View className="h-24 w-24 rounded-full bg-gray-200 items-center justify-center">
							<Text className="font-bold text-black text-3xl">{iniciasNomeUsuario}</Text>
						</View>
					)}

					<Modal visible={modalImageVisible} transparent animationType="fade">
						<TouchableWithoutFeedback onPress={() => setModalImageVisible(false)}>
							<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
								<TouchableOpacity className='absolute top-10 right-10 z-10' onPress={() => setModalImageVisible(false)}>
									<Text className='text-white text-2xl'>✕</Text>
								</TouchableOpacity>
								<TouchableWithoutFeedback>
									<Image source={{ uri: imagemUrl }} style={{ minWidth: 100, minHeight: 100, width: 300, height: 300, borderRadius: 20 }} resizeMode="contain" />
								</TouchableWithoutFeedback>
							</View>
						</TouchableWithoutFeedback>
					</Modal>


					<ErrorNotification
						loading={loading}
						statusSuccess={statusSuccess}
						loadingText="Carregando imagem..."
						successText="Imagem enviada com sucesso!"
						errorText="Erro ao enviar imagem."
					/>
					<ErrorNotification
						loading={loadingUpdate}
						statusSuccess={statusSuccessUpdate}
						loadingText="Atualizando..."
						successText="Imagem atualizada com sucesso!"
						errorText="Erro ao atualizar imagem."
					/>

					<View className="flex-row gap-2">
						<ButtonUpload onPress={handlePickImage} title="Alterar Foto" />
						<ButtonUpload onPress={handleTakePhoto} title="Tirar Foto" />
					</View>
				</View>

				<View className="w-full flex-col gap-2.5">
					<InputAuth
						id="nome"
						name="nome"
						label="Nome"
						placeholder="Nome completo"
						control={control}
						rules={rules.nome}
						type="default"
					/>
					<InputAuth
						id="email"
						name="email"
						label="Email"
						placeholder="Email"
						desabilitar
						status="error"
						control={control}
						rules={rules.email}
						type="email-address"
					/>
					<InputAuth
						id="cpf"
						name="cpf"
						label="CPF"
						placeholder="CPF"
						control={control}
						rules={rules.cpf}
						config="cpf"
						type="number-pad"
					/>
					<DropDown
						name="cnh"
						label="Tipo de CNH"
						placeholder="Selecione o tipo de CNH"
						control={control}
						rules={rules.cnh}
						items={dataCnh}
					/>
				</View>

				<View className="w-full flex-row gap-4 my-[20px]">
					<ButtonPadrao
						title="Cancelar"
						typeButton="normal"
						classname="flex-1"
						onPress={() => navigation.goBack()}
					/>
					{(saving) ? (
						<ButtonPadrao
							title="Salvando..."
							typeButton="normal"
							classname="flex-1"
							onPress={handleSave}
							disabled
						/>
					) :
						<ButtonPadrao
							title="Salvar"
							typeButton="normal"
							classname="flex-1"
							onPress={handleSave}
						/>
					}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default EditProfile;
