import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface AlertErrorProps {
    visible: boolean;
    message: string | null;
    onClose: () => void;
    title?: string;
}

const AlertError: React.FC<AlertErrorProps> = ({ visible, message, onClose, title = 'Erro de Login' }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className='flex-1 justify-center items-center bg-black/20'>
                <View className='bg-white w-[80%] p-2.5 rounded-lg '>
                    <View className='w-full flex-row justify-between items-center pb-5'>
                        <Text className='text-red-500 font-bold text-lg mb-2'>{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#EF4444" />
                        </TouchableOpacity>
                    </View>
                    <Text className=' text-[#333] pb-5'>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

export default AlertError;
