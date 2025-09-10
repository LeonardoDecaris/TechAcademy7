import React, { useCallback, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import animation from '@/src/utils/animation';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  visible: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  blurIntensity?: number;
};

const btnCancelClass = 'bg-gray-200';
const btnConfirmClass = 'bg-blue-600';
const rowButtonsClass = 'flex-row gap-2';
const titleClass = 'mt-2 text-lg font-bold';
const headerWrapperClass = 'items-center mb-4';
const txtConfirmClass = 'font-semibold text-white';
const txtCancelClass = 'font-semibold text-gray-800';
const messageClass = 'text-center text-gray-600 mb-6';
const overlayClass = 'flex-1 items-center justify-center';
const cardClass = 'w-11/12 max-w-[360px] rounded-lg bg-white p-6';
const btnBaseClass = 'flex-1 h-11 rounded-lg items-center justify-center';

const overlayTintStyle = { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' } as const;

const AlertNotNullVehiculo: React.FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
  loading = false,
  title = 'Nenhum veículo cadastrado',
  message = 'Usuário não tem veículo cadastrado.\nDeseja realizar o cadastro?',
  confirmText = 'Cadastrar',
  cancelText = 'Cancelar',
  blurIntensity = 20
}) => {
  const confirmingRef = useRef(false);
  const navigation = useNavigation<NavigationProp>();

  const handleCancel = useCallback(() => {
    if (loading) return;
    onCancel();
  }, [loading, onCancel]);

  const goRegisterVehicle = useCallback(() => navigation.navigate('RegisterVehicle'), [navigation]);

  const handleConfirm = useCallback(async () => {
    if (loading || confirmingRef.current) return;
    confirmingRef.current = true;
    try {
      await onConfirm();
      goRegisterVehicle();
    } finally {
      confirmingRef.current = false;
    }
  }, [loading, onConfirm]);

  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      onRequestClose={handleCancel}
      animationType="fade"
      presentationStyle="overFullScreen"
    >
      <View
        className={overlayClass}
        accessibilityViewIsModal
        accessibilityLabel={title}
      >
        <View style={overlayTintStyle} />
        <BlurView
          intensity={blurIntensity}
          style={{ position: 'absolute', inset: 0 }}
          tint="dark"
        />
        <animation.FadeUp>
          <View className={cardClass}>
            <View className={headerWrapperClass}>
              <Ionicons name="car-outline" size={36} color="#f59e42" accessibilityLabel="Ícone de carro" />
              <Text className={titleClass}>{title}</Text>
            </View>

            <Text className={messageClass}>{message}</Text>

            <View className={rowButtonsClass}>
              <TouchableOpacity
                onPress={handleCancel}
                disabled={loading}
                className={`${btnBaseClass} ${btnCancelClass}`}
                accessibilityRole="button"
                accessibilityLabel="Cancelar cadastro de veículo"
              >
                <Text className={txtCancelClass}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                disabled={loading}
                className={`${btnBaseClass} ${btnConfirmClass}`}
                style={{ opacity: loading ? 0.85 : 1 }}
                accessibilityRole="button"
                accessibilityLabel={loading ? 'Processando...' : 'Confirmar cadastro de veículo'}
                accessibilityState={{ busy: loading, disabled: loading }}
              >
                <Text className={txtConfirmClass}>
                  {loading ? 'Aguarde...' : confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </animation.FadeUp>
      </View>
    </Modal>
  );
};

export default AlertNotNullVehiculo;