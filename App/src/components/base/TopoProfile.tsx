import React from "react"
import { ActivityIndicator, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { Image, View } from "react-native"

interface TopoProfileProps {
    imagemUrl: string;
    modalImageVisible: boolean;
    iniciasNomeUsuario: string;
    setModalImageVisible: (visible: boolean) => void;
}

const logoInitialStyle = 'rounded-full bg-gray-200 items-center justify-center';
const avatarStyle = 'w-28 h-28 absolute -bottom-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full';

const TopoProfile = (props: TopoProfileProps) => {
    return (
        <>
            <View className='w-full relative'>
                <Image source={require('../../assets/image/image.png')} style={{ width: '100%', height: 130 }} className='rounded-2xl' />
                {props.imagemUrl ? (
                    <TouchableOpacity onPress={() => props.setModalImageVisible(true)}>
                        <Image source={{ uri: props.imagemUrl }} className={avatarStyle} />
                    </TouchableOpacity>
                ) : (
                    <View className={`${avatarStyle} ${logoInitialStyle} shadow-[0_2px_6px_rgba(0,0,0,0.25)]`}>
                        {props.iniciasNomeUsuario
                            ? <Text className='font-bold text-black text-3xl'>{props.iniciasNomeUsuario}</Text>
                            : <ActivityIndicator size="small" color="#000" />
                        }
                    </View>
                )}
            </View>

            <Modal visible={props.modalImageVisible} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => props.setModalImageVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity className='absolute top-10 right-10 z-10' onPress={() => props.setModalImageVisible}>
                            <Text className='text-white text-2xl'>✕</Text>
                        </TouchableOpacity>
                        <TouchableWithoutFeedback>
                            <Image source={{ uri: props.imagemUrl }} style={{ minWidth: 100, minHeight: 100, width: 300, height: 300, borderRadius: 20 }} resizeMode="contain" />
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default TopoProfile;