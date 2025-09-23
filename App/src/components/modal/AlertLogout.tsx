import React, { memo, useCallback, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import animation from '@/src/utils/animation';

type Props = {
  visible: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

const overlayStyle = { backgroundColor: 'rgba(0,0,0,0.5)' };

const overlayClass = 'flex-1 justify-center items-center';
const cardClass = 'w-full rounded-lg bg-white p-6 mx-4';
const iconWrapperClass = 'items-center mb-4';
const titleClass = 'mt-2 text-lg font-bold';
const messageClass = 'text-center text-gray-600 mb-6';
const buttonsRowClass = 'flex-row gap-2';
const btnBaseClass = 'flex-1 h-11 rounded-lg items-center justify-center';
const btnCancelClass = 'bg-gray-200';
const btnConfirmClass = 'bg-red-500';
const txtCancelClass = 'font-semibold text-gray-800';
const txtConfirmClass = 'font-semibold text-white';

const AlertLogout = ({
  visible,
  onConfirm,
  onCancel,
  title = 'Sair da conta',
  message = 'Tem certeza que deseja sair?',
  confirmText = 'Sair',
  cancelText = 'Cancelar',
  loading = false
}: Props) => {
  const confirmingRef = useRef(false);

  const handleCancel = useCallback(() => {
    if (loading) return;
    onCancel();
  }, [loading, onCancel]);

  const handleConfirm = useCallback(async () => {
    if (loading || confirmingRef.current) return;
    confirmingRef.current = true;
    try {
      await onConfirm();
      AccessibilityInfo.announceForAccessibility?.('Saindo da conta');
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
        style={overlayStyle}
        accessibilityViewIsModal
        accessibilityRole="alert"
        accessibilityLabel={title}
      >
        <animation.FadeUp>
          <View className={cardClass}>
            <View className={iconWrapperClass}>
              <Ionicons name="log-out-outline" size={36} color="#ef4444" accessibilityLabel="Ícone de logout" />
              <Text className={titleClass}>{title}</Text>
            </View>

            <Text className={messageClass}>{message}</Text>

            <View className={buttonsRowClass}>
              <TouchableOpacity
                onPress={handleCancel}
                disabled={loading}
                className={`${btnBaseClass} ${btnCancelClass}`}
                accessibilityRole="button"
                accessibilityLabel="Cancelar logout"
              >
                <Text className={txtCancelClass}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                disabled={loading}
                className={`${btnBaseClass} ${btnConfirmClass}`}
                style={{ opacity: loading ? 0.85 : 1 }}
                accessibilityRole="button"
                accessibilityLabel={loading ? 'Saindo...' : 'Confirmar logout'}
                accessibilityState={{ busy: loading, disabled: loading }}
              >
                <Text className={txtConfirmClass}>
                  {loading ? 'Saindo...' : confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </animation.FadeUp>
      </View>
    </Modal>
  );
};

export default memo(AlertLogout);