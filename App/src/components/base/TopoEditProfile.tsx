import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import ErrorNotification from '../modal/ErrorNotioncation';
import { ButtonUpload } from '../form/Buttons';

const avatarSize = 100;
const imageModalCloseStyle = 'absolute top-10 right-10 z-10';
const avatarFallbackTextStyle = 'font-bold text-black text-3xl';
const avatarContainerStyle = 'flex-col gap-3 justify-center items-center pb-5';
const avatarFallbackWrapperStyle = 'h-24 w-24 rounded-full bg-gray-200 items-center justify-center';

interface TopoEditProfileProps {
    selectedImage: string | null;
    imagemUrl: string;
    iniciasNomeUsuario: string;
    modalImageVisible: boolean;
    setModalImageVisible: (visible: boolean) => void;
    setSelectedImage: (image: string | null) => void;
    loading: boolean;
    statusSuccess: boolean | null;
    loadingUpdate: boolean;
    statusSuccessUpdate: boolean | null;
    handlePickImage: () => void;
    handleTakePhoto: () => void;
    buttonsRowStyle: string;
}

const TopoEditProfile = ({ selectedImage, imagemUrl, iniciasNomeUsuario, modalImageVisible, setModalImageVisible, setSelectedImage, loading, statusSuccess, loadingUpdate, statusSuccessUpdate, handlePickImage, handleTakePhoto, buttonsRowStyle }: TopoEditProfileProps) => {
    return (
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
    );
};

export default TopoEditProfile;