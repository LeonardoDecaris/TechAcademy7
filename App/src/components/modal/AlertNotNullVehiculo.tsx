import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import animation from '@/src/utils/animation';

type Props = {
    visible: boolean;
    onConfirm: () => void | Promise<void>;
    onCancel: () => void;
    loading?: boolean;
};

const AlertNotNullVehiculo: React.FC<Props> = ({
    visible,
    onConfirm,
    onCancel,
    loading = false,
}) => (
    <Modal
        transparent
        visible={visible}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={onCancel}
    >
        <View className="flex-1 items-center justify-center">
            <MaterialCommunityIcons name="truck-outline" size={36} color={"#f59e42"} />;
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(10px)' }]} />
            <animation.FadeUp>
                <View className="w-11/12 max-w-[360px] rounded-lg bg-white p-6">
                    <View className="items-center mb-4">
                        <Ionicons name="car-outline" size={36} color="#f59e42" />
                        <Text className="mt-2 text-lg font-bold">Nenhum veículo cadastrado</Text>
                    </View>

                    <Text className="text-center text-gray-600 mb-6">
                        Usuário não tem veículo cadastrado.{"\n"}
                        Deseja realizar o cadastro?
                    </Text>

                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            onPress={onCancel}
                            className="flex-1 h-11 rounded-lg bg-gray-200 items-center justify-center"
                        >
                            <Text className="font-semibold text-gray-800">Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            disabled={loading}
                            className="flex-1 h-11 rounded-lg items-center justify-center"
                            style={{ backgroundColor: '#2563eb', opacity: loading ? 0.85 : 1 }}
                        >
                            <Text className="font-semibold text-white">
                                {loading ? 'Aguarde...' : 'Cadastrar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </animation.FadeUp>
        </View>
    </Modal>
);

export default AlertNotNullVehiculo;