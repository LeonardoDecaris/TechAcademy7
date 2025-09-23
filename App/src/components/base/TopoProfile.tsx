import React from "react"
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { Image, View } from "react-native"

interface TopoProfileProps {
    imageUser: string;
    modalImageVisible: boolean;
    iniciasNomeUsuario: string;
    setModalImageVisible: (visible: boolean) => void;
}

const logoInitialStyle = 'rounded-full bg-gray-200 items-center justify-center';
const avatarStyle = 'w-28 h-28 absolute -bottom-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full';

const TopoProfile = ({ imageUser, modalImageVisible, setModalImageVisible, iniciasNomeUsuario }: TopoProfileProps) => {
    return (
        <>
            <View className='w-full relative'>
                <Image source={require('../../assets/image/image.png')} style={{ width: '100%', height: 130 }} className='rounded-2xl' />
                {imageUser ? (
                    <TouchableOpacity onPress={() => setModalImageVisible(true)}>
                        <Image source={{ uri: imageUser }} className={avatarStyle} />
                    </TouchableOpacity>
                ) : (
                    <View className={`${avatarStyle} ${logoInitialStyle} shadow-[0_2px_6px_rgba(0,0,0,0.25)]`}>
                        <Text className='font-bold text-black text-3xl'>{iniciasNomeUsuario}</Text>
                    </View>
                )}
            </View>

            <Modal visible={modalImageVisible} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setModalImageVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity className='absolute top-10 right-10 z-10' onPress={() => setModalImageVisible}>
                            <Text className='text-white text-2xl'>✕</Text>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback>
                            <Image source={{ uri: imageUser }} style={{ minWidth: 100, minHeight: 100, width: 300, height: 300, borderRadius: 20 }} resizeMode="contain" />
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default TopoProfile;