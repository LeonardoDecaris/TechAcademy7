import React, { memo, useCallback, useMemo, useState } from 'react';
import { Image, Platform, ScrollView, View, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import InputAuth from '@/src/components/form/InputAuth';
import AlertNotioncation from '@/src/components/modal/AlertNotioncation';
import { ButtonPadrao, ButtonUpload } from '@/src/components/form/Buttons';
import ErrorNotification from '@/src/components/modal/ErrorNotioncation';
import useRegisterVehicle from '@/src/hooks/hookVehicle/useRegisterVehicle';
import useImagemVehicle from '@/src/hooks/hookVehicle/useImagemVehicle';

const imageWrapperStyle = 'w-full py-5 flex-col gap-2 items-center';
const imagePlaceholderStyle = 'w-full h-44 rounded-lg bg-gray-200 justify-center items-center';
const imageStyle = 'w-full h-44 rounded-lg';
const formWrapperStyle = 'w-full flex-col gap-1.5';
const actionsWrapperStyle = 'w-full items-end pt-5 pr-2.5';

type FieldName = 'marca' | 'modelo' | 'placa' | 'anoFabricacao' | 'quilometragem' | 'capacidade';
interface FieldConfig {
    name: FieldName;
    label: string;
    placeholder: string;
    id: string;
    quantity?: number;
    type?: string;
    size?: 'normal' | 'pequeno';
}

const RegisterVehicle = () => {

    const { control, handleSubmit, rules, handleEditar, notification, success, successVisible, closeSuccessNotification, setValue } = useRegisterVehicle();
    const { uploadImage, loading, statusSuccess } = useImagemVehicle();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);

    const requestPermission = useCallback(async (type: 'camera' | 'gallery') => {
        const result = type === 'camera'
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();
        return result.granted;
    }, []);

    const pickOrTakeImage = useCallback(async (type: 'camera' | 'gallery') => {
        const hasPermission = await requestPermission(type);
        if (!hasPermission) {
            alert(type === 'camera'
                ? 'Permissão para acessar a câmera é necessária!'
                : 'Permissão para acessar a galeria é necessária!');
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
    }, [requestPermission]);

    const handlePickImage = useCallback(async () => {
        if (imageUploading) return;
        const uri = await pickOrTakeImage('gallery');
        if (uri) setSelectedImage(uri);
    }, [pickOrTakeImage, imageUploading]);

    const handleTakePhoto = useCallback(async () => {
        if (imageUploading) return;
        const uri = await pickOrTakeImage('camera');
        if (uri) setSelectedImage(uri);
    }, [pickOrTakeImage, imageUploading]);

    const handleRemoveImage = useCallback(() => {
        if (imageUploading) return;
        setSelectedImage(null);
        setValue('imagemVeiculo_id', undefined as any);
    }, [imageUploading, setValue]);

    const handleRegister = useCallback(async () => {
        if (isSaving || imageUploading) return;
        if (!selectedImage) {
            alert('Por favor, selecione uma imagem para o veículo.');
            return;
        }
        setIsSaving(true);
        try {
            setImageUploading(true);
            const imageId = await uploadImage(selectedImage);
            setImageUploading(false);
            if (!imageId) {
                alert('Falha ao fazer upload da imagem. Tente novamente.');
                return;
            }
            setValue('imagemVeiculo_id', imageId);
            await handleSubmit(handleEditar)();
        } catch (error) {
            console.error('Erro no registro:', error);
            alert('Ocorreu um erro ao registrar o veículo.');
        } finally {
            setIsSaving(false);
            setImageUploading(false);
        }
    }, [handleSubmit, handleEditar, selectedImage, uploadImage, setValue, isSaving, imageUploading]);

    const fieldConfigs: FieldConfig[] = useMemo(() => ([
        { name: 'marca', label: 'Marca', placeholder: 'Marca do veículo', id: 'marca', type: 'default' },
        { name: 'modelo', label: 'Modelo', placeholder: 'Modelo do veículo', id: 'modelo', type: 'default' },
        { name: 'placa', label: 'Placa', placeholder: 'ABC1234', id: 'placa', type: 'default', quantity: 7 },
    ]), []);

    const smallFieldConfigs: FieldConfig[] = useMemo(() => ([
        { name: 'anoFabricacao', label: 'Ano de fabricação', placeholder: 'Ano de fabricação', id: 'anoFabricacao', type: 'numeric', quantity: 4, size: 'pequeno' },
        { name: 'quilometragem', label: 'Quilometragem', placeholder: 'Quilometragem', id: 'quilometragem', type: 'numeric', size: 'pequeno' },
        { name: 'capacidade', label: 'Capacidade (T)', placeholder: 'Capacidade', id: 'capacidade', type: 'numeric', size: 'pequeno', quantity: 8 },
    ]), []);

    const canSubmit = !isSaving && !imageUploading;


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 40, flexGrow: 1 }}
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

                <View className={imageWrapperStyle}>
                    <TouchableOpacity
                        className='w-full'
                        onPress={handlePickImage}
                        accessibilityRole='imagebutton'
                        accessibilityLabel={selectedImage ? 'Alterar imagem do veículo' : 'Selecionar imagem do veículo'}
                        disabled={imageUploading}
                    >
                        {selectedImage ? (
                            <View className='relative'>
                                <Image source={{ uri: selectedImage }} className={imageStyle} />
                                <TouchableOpacity
                                    onPress={handleRemoveImage}
                                    className='absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1'
                                    accessibilityRole='button'
                                    accessibilityLabel='Remover imagem selecionada'
                                >
                                    <Text className='text-white text-xs'>Remover</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className={imagePlaceholderStyle}>
                                <Text className='text-gray-500'>Selecione uma imagem</Text>
                            </View>
                        )}
                    </TouchableOpacity>


                    <ErrorNotification
						loading={loading}
						statusSuccess={statusSuccess}
						loadingText="Carregando imagem..."
						successText="Imagem enviada com sucesso!"
						errorText="Erro ao enviar imagem."
					/>

                    <View className='flex-row justify-center gap-2'>
                        <ButtonUpload onPress={handlePickImage} title={selectedImage ? 'Trocar Foto' : 'Escolher Foto'} disabled={imageUploading} />
                        <ButtonUpload onPress={handleTakePhoto} title='Tirar Foto' disabled={imageUploading} />
                    </View>
                </View>

                <View className={formWrapperStyle}>
            {fieldConfigs.map((f) => (
                        <InputAuth
                key={f.id}
                            control={control}
                rules={rules[f.name]}
                name={f.name as any}
                            id={f.id}
                            placeholder={f.placeholder}
                            label={f.label}
                            type={f.type as any}
                            quantity={f.quantity}
                        />
                    ))}
                    <View className='w-full flex-row justify-between'>
            {smallFieldConfigs.slice(0, 2).map((f) => (
                            <InputAuth
                key={f.id}
                                control={control}
                rules={rules[f.name]}
                name={f.name as any}
                                id={f.id}
                                placeholder={f.placeholder}
                                label={f.label}
                                type={f.type as any}
                                quantity={f.quantity}
                                Tamanho='pequeno'
                            />
                        ))}
                    </View>
                    <View className='w-full flex-row justify-between'>
            {smallFieldConfigs.slice(2, 3).map((f) => (
                            <InputAuth
                key={f.id}
                                control={control}
                rules={rules[f.name]}
                name={f.name as any}
                                id={f.id}
                                placeholder={f.placeholder}
                                label={f.label}
                                type={f.type as any}
                                quantity={f.quantity}
                                Tamanho='pequeno'
                            />
                        ))}
                    </View>
                </View>

                <View className={actionsWrapperStyle}>
                    <ButtonPadrao
                        title={isSaving ? 'Cadastrando...' : 'Cadastrar'}
                        onPress={handleRegister}
                        disabled={!canSubmit}
                        typeButton='normal'
                        classname='px-5'
                    />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default memo(RegisterVehicle);