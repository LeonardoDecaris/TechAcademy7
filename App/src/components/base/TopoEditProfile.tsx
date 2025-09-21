import React from 'react';

import { ButtonUpload } from '../form/Buttons';
import ErrorNotification from '../modal/ErrorNotioncation';
import { View, Text, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const avatarSize = 100;
const imageModalCloseStyle = 'absolute top-10 right-10 z-10';
const avatarFallbackTextStyle = 'font-bold text-black text-3xl';
const avatarContainerStyle = 'flex-col gap-3 justify-center items-center pb-5';
const avatarFallbackWrapperStyle = 'h-24 w-24 rounded-full bg-gray-200 items-center justify-center';

interface TopoEditProfileProps {
    loading: boolean;
    imagemUrl: string;
    loadingUpdate: boolean;
    buttonsRowStyle: string;
    modalImageVisible: boolean;
    iniciasNomeUsuario: string;
    selectedImage: string | null;
    statusSuccess: boolean | null;
    statusSuccessUpdate: boolean | null;

    handlePickImage: () => void;
    handleTakePhoto: () => void;
    setModalImageVisible: (visible: boolean) => void;
    setSelectedImage: (image: string | null) => void;
}

const TopoEditProfile = (props: TopoEditProfileProps) => {
    return (
        <View className={avatarContainerStyle}>
            {props.selectedImage ? (
                <TouchableOpacity
                    onPress={() => props.setSelectedImage(null)}
                    accessibilityLabel='Remover nova imagem selecionada'
                >
                    <Image
                        source={{ uri: props.selectedImage }}
                        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
                    />
                </TouchableOpacity>
            ) : props.imagemUrl ? (
                <TouchableOpacity
                    onPress={() => props.setModalImageVisible(true)}
                    accessibilityLabel='Ampliar imagem do perfil'
                >
                    <Image
                        source={{ uri: props.imagemUrl }}
                        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
                    />
                </TouchableOpacity>
            ) : (
                <View className={avatarFallbackWrapperStyle}>
                    <Text className={avatarFallbackTextStyle}>{props.iniciasNomeUsuario}</Text>
                </View>
            )}

            <Modal visible={props.modalImageVisible} transparent animationType='fade'>
                <TouchableWithoutFeedback onPress={() => props.setModalImageVisible(false)}>
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
                            onPress={() => props.setModalImageVisible(false)}
                            accessibilityLabel='Fechar visualização da imagem'
                        >
                            <Text className='text-white text-2xl'>✕</Text>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback>
                            <Image
                                source={{ uri: props.imagemUrl }}
                                style={{ minWidth: 100, minHeight: 100, width: 300, height: 300, borderRadius: 20 }}
                                resizeMode='contain'
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <ErrorNotification
                loading={props.loading}
                statusSuccess={props.statusSuccess}
                loadingText='Carregando imagem...'
                successText='Imagem enviada com sucesso!'
                errorText='Erro ao enviar imagem.'
            />
            <ErrorNotification
                loading={props.loadingUpdate}
                statusSuccess={props.statusSuccessUpdate}
                loadingText='Atualizando...'
                successText='Imagem atualizada com sucesso!'
                errorText='Erro ao atualizar imagem.'
            />

            <View className={props.buttonsRowStyle}>
                <ButtonUpload
                    onPress={props.handlePickImage}
                    title='Alterar Foto'
                    accessibilityLabel='Selecionar nova foto da galeria'
                />
                <ButtonUpload
                    onPress={props.handleTakePhoto}
                    title='Tirar Foto'
                    accessibilityLabel='Tirar foto com a câmera'
                />
            </View>
        </View>
    );
};

export default TopoEditProfile;