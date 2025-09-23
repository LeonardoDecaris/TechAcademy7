import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import { BASE_URL } from '@env';
import { dataCnh } from '@/src/data/dataCnh';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as ImagePicker from 'expo-image-picker';
import DropDown from '@/src/components/form/DropDown';
import InputAuth from '@/src/components/form/InputAuth';
import { ButtonPadrao } from '@/src/components/form/Buttons';

import useImageUser from '@/src/hooks/hookUser/useImageUser';
import useEditarUsuario from '@/src/hooks/hookUser/useEditUser';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import useEditImageUser from '@/src/hooks/hookUser/useEditImageUser';
import AlertNotification from '@/src/components/modal/AlertNotification';
import TopoEditProfile from '@/src/components/base/TopoEditProfile';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const buttonsRowStyle = 'flex-row gap-2';
const formWrapperStyle = 'w-full flex-col gap-2.5';
const actionsRowStyle = 'w-full flex-row gap-4 my-[20px]';

const EditProfile = () => {

    const navigation = useNavigation<NavigationProp>();
    const { iniciasNomeUsuario, userData, getUserData } = useGetUserData();
    const { control, handleSubmit, rules, setValue, handleEditar, notificationVisible, closeNotification, message, status, loading: saving } = useEditarUsuario();

    const { uploadImage, loading, statusSuccess } = useImageUser();
    const { updateImage, loadingUpdate, statusSuccessUpdate } = useEditImageUser();

    const savingLabel = useMemo(() => saving ? 'Salvando...' : 'Salvar', [saving]);
    const disableSave = useMemo(() => saving || loading || loadingUpdate, [saving, loading, loadingUpdate]);

    const [modalImageVisible, setModalImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : '';

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

            const pickerFn = type === 'camera'
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

    const handleImageUpload = useCallback(async (): Promise<string | null> => {
        if (!selectedImage || selectedImage === imagemUrl) {
            return userData?.imagemUsuario?.id_imagem ? String(userData.imagemUsuario.id_imagem) : null;
        }
        const idAtual = userData?.imagemUsuario?.id_imagem;
        if (idAtual && imagemUrl) {
            await updateImage(String(idAtual), selectedImage);
            if (statusSuccessUpdate === false) throw new Error('Erro ao atualizar imagem.');
            return String(idAtual);
        } else {
            const idImagem = await uploadImage(selectedImage);
            if (!idImagem || statusSuccess === false) throw new Error('Erro ao enviar imagem.');
            return String(idImagem);
        }
    }, [selectedImage, imagemUrl, userData?.imagemUsuario?.id_imagem, updateImage, statusSuccessUpdate, uploadImage, statusSuccess]);

    const handleSave = useCallback(async () => {
        await handleSubmit(async (data) => {
            try {
                const imagemUsuarioId = await handleImageUpload();
                const formData = { ...data, imagemUsuario_id: imagemUsuarioId };
                await handleEditar(formData);
            } catch (error) {
                console.error('Error saving profile:', error);
            }
        })();
    }, [handleSubmit, handleEditar, handleImageUpload]);

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


    useEffect(() => {
        getUserData();
    }, [getUserData]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <ScrollView
                contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 10, flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
            >
                <AlertNotification
                    visible={notificationVisible}
                    status={status}
                    messagem={message}
                    onDismiss={closeNotification}
                    topOffset={10}
                />

                <TopoEditProfile
                    selectedImage={selectedImage}
                    imagemUrl={imagemUrl}
                    iniciasNomeUsuario={iniciasNomeUsuario}
                    modalImageVisible={modalImageVisible}
                    setModalImageVisible={setModalImageVisible}
                    setSelectedImage={setSelectedImage}
                    loading={loading}
                    statusSuccess={statusSuccess}
                    loadingUpdate={loadingUpdate}
                    statusSuccessUpdate={statusSuccessUpdate}
                    handlePickImage={handlePickImage}
                    handleTakePhoto={handleTakePhoto}
                    buttonsRowStyle={buttonsRowStyle}
                />

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
                        loading={saving}
                        accessibilityLabel='Salvar alterações do perfil'
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default memo(EditProfile);
