import React, { memo, useCallback, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import animation from '@/src/utils/animation';

interface Props {
  visible: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const overlayStyle = { backgroundColor: 'rgba(0,0,0,0.5)' };
const btnConfirmClass = 'bg-red-500';
const btnCancelClass = 'bg-gray-200';
const rowButtonsClass = 'flex-row gap-2';
const titleClass = 'mt-2 text-lg font-bold';
const headerWrapperClass = 'items-center mb-4';
const txtConfirmClass = 'font-semibold text-white';
const txtCancelClass = 'font-semibold text-gray-800';
const messageClass = 'text-center text-gray-600 mb-6';
const cardClass = 'w-full rounded-lg bg-white p-6 mx-4';
const overlayClass = 'flex-1 justify-center items-center';
const btnBaseClass = 'flex-1 h-11 rounded-lg items-center justify-center';

const AlterDeleteUser: React.FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
  title = 'Excluir conta',
  message = 'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
  confirmText = 'Excluir',
  cancelText = 'Cancelar',
  loading = false
}) => {
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
      AccessibilityInfo.announceForAccessibility?.('Conta excluída');
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
            <View className={headerWrapperClass}>
              <Ionicons name="trash-outline" size={36} color="#ef4444" accessibilityLabel="Ícone de exclusão" />
              <Text className={titleClass}>{title}</Text>
            </View>

            <Text className={messageClass}>{message}</Text>

            <View className={rowButtonsClass}>
              <TouchableOpacity
                onPress={handleCancel}
                disabled={loading}
                className={`${btnBaseClass} ${btnCancelClass}`}
                accessibilityRole="button"
                accessibilityLabel="Cancelar exclusão"
              >
                <Text className={txtCancelClass}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                disabled={loading}
                className={`${btnBaseClass} ${btnConfirmClass}`}
                style={{ opacity: loading ? 0.85 : 1 }}
                accessibilityRole="button"
                accessibilityLabel={loading ? 'Excluindo conta' : 'Confirmar exclusão'}
                accessibilityState={{ busy: loading, disabled: loading }}
              >
                <Text className={txtConfirmClass}>
                  {loading ? 'Excluindo...' : confirmText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </animation.FadeUp>
      </View>
    </Modal>
  );
};

export default AlterDeleteUser;