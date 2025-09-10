import { useState } from "react";
import { Image, Platform, ScrollView, View, KeyboardAvoidingView, TouchableOpacity, Text } from "react-native";

import { BASE_URL } from '@env';
import InputAuth from "@/src/components/form/InputAuth";
import AlertNotioncation from "@/src/components/modal/AlertNotioncation";
import { ButtonPadrao, ButtonUpload } from "@/src/components/form/Buttons";

import * as ImagePicker from 'expo-image-picker';
import ErrorNotification from "@/src/components/modal/ErrorNotioncation";
import useRegisterVehicle from "@/src/hooks/hookVehicle/useRegisterVehicle";
import useImagemVehicle from "@/src/hooks/hookVehicle/useImagemVehicle";


function RegisterVehicle() {
    const { control, handleSubmit, rules, handleEditar, notification, success, successVisible, closeSuccessNotification, setValue } = useRegisterVehicle();
    const { uploadImage, loading, statusSuccess } = useImagemVehicle();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);


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

    const handleRegister = async () => {
        if (!selectedImage) {
            alert('Por favor, selecione uma imagem para o veículo.');
            return;
        }

        setIsSaving(true);

        try {
            const imageId = await uploadImage(selectedImage);
            if (imageId) {
                setValue('imagemVeiculo_id', imageId);
                await handleSubmit(handleEditar)();
            } else {
                alert('Falha ao fazer upload da imagem. Tente novamente.');
            }
        } catch (error) {
            console.error("Erro no registro:", error);
            alert('Ocorreu um erro ao registrar o veículo.');
        } finally {
            setIsSaving(false);
        }
    };


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

                <View className="w-full py-5 flex-col gap-2 items-center">
                    <TouchableOpacity className="w-full" onPress={handlePickImage}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} className="w-full h-44 rounded-lg" />
                        ) : (
                            <View className="w-full h-44 rounded-lg bg-gray-200 justify-center items-center">
                                <Text className="text-gray-500">Selecione uma imagem</Text>
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

                    <View className="flex-row justify-center gap-2">
                        <ButtonUpload onPress={handlePickImage} title="Escolher Foto" />
                        <ButtonUpload onPress={handleTakePhoto} title="Tirar Foto" />
                    </View>
                </View>

                <View className='w-full flex-col gap-1.5'>
                    <InputAuth
                        control={control}
                        rules={rules.marca}
                        name="marca"
                        id='marca'
                        placeholder='Marca do veículo'
                        label='Marca'
                        type="default"
                    />
                    <InputAuth
                        control={control}
                        rules={rules.modelo}
                        name="modelo"
                        id='modelo'
                        placeholder='Modelo do veículo'
                        label='Modelo'
                        type="default"
                    />
                    <InputAuth
                        control={control}
                        rules={rules.placa}
                        name="placa"
                        id='placa'
                        quantity={7}
                        placeholder='Placa do veículo'
                        label='Placa'
                        type="default"
                    />

                    <View className="w-full flex-row justify-between ">
                        <InputAuth
                            control={control}
                            rules={rules.anoFabricacao}
                            name="anoFabricacao"
                            id='anoFabricacao'
                            placeholder='Ano de fabricação'
                            label='Ano de fabricação'
                            type="numeric"
                            quantity={4}
                            Tamanho="pequeno"
                        />
                        <InputAuth
                            control={control}
                            rules={rules.quilometragem}
                            name="quilometragem"
                            id='quilometragem'
                            placeholder='Quilometragem'
                            label='Quilometragem'
                            type="numeric"
                            Tamanho="pequeno"
                        />
                    </View>

                    <View className="w-full flex-row justify-between ">
                        <InputAuth
                            control={control}
                            rules={rules.capacidade}
                            name="capacidade"
                            id='capacidade'
                            placeholder='Capacidade'
                            label='Capacidade (T)'
                            type="numeric"
                            Tamanho="pequeno"
                            quantity={8}
                        />
                    </View>
                </View>

                <View className="w-full items-end pt-5 pr-2.5">
                    <ButtonPadrao
                        title={isSaving ? 'Cadastrando...' : 'Cadastrar'}
                        onPress={handleRegister}
                        disabled={isSaving}
                        typeButton='normal'
                        classname=' px-5 '
                    />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default RegisterVehicle;