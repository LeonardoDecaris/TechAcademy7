// filepath: d:\ProjetosDev\TechAcademy7\App\src\components\modal\ModalConfirmation.tsx
import React, { memo, useCallback, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, AccessibilityInfo, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import animation from '@/src/utils/animation';

export type ModalConfirmationMode =
  | 'cancel_contract'
  | 'no_vehicle'
  | 'delete_vehicle'
  | 'logout';

interface ModalInfo {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  confirmColor: string;
}

interface ModalConfirmationProps {
  visible: boolean;
  mode: ModalConfirmationMode;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

const mapContent: Record<ModalConfirmationMode, ModalInfo> = {
  cancel_contract: {
    title: 'Cancelar contrato',
    message: 'Tem certeza que deseja cancelar este contrato?',
    confirmText: 'Cancelar',
    cancelText: 'Voltar',
    iconName: 'document-text-outline',
    confirmColor: 'bg-red-500',
  },

  no_vehicle: {
    title: 'Nenhum veículo',
    message: 'Você ainda não possui veículo cadastrado. Deseja cadastrar agora?',
    confirmText: 'Cadastrar',
    cancelText: 'Depois',
    iconName: 'car-sport-outline',
    confirmColor: 'bg-blue-500',
  },

  logout: {
    title: 'Sair da conta',
    message: 'Deseja realmente sair da sua conta?',
    confirmText: 'Sair',
    cancelText: 'Ficar',
    iconName: 'log-out-outline',
    confirmColor: 'bg-red-500',
  },
  
  delete_vehicle: {
    title: 'Excluir veículo',
    message: 'Tem certeza que deseja excluir este veículo?',
    confirmText: 'Excluir',
    cancelText: 'Cancelar',
    iconName: 'car-sport-outline',
    confirmColor: 'bg-red-500',
  },
};

const modalStyles = {
  overlay: 'flex-1 justify-center px-6 items-center bg-black/40',
  card: 'w-full rounded-xl bg-white px-5 py-6 shadow-xl shadow-black/20 items-center',
  iconWrapper: 'items-center',
  title: 'mt-3 text-xl font-bold text-slate-800 text-center',
  message: 'py-2.5 text-base text-slate-500 text-center leading-relaxed',
  buttonsRow: 'flex-row gap-3 w-full',
  btnBase: 'flex-1 py-3 rounded-lg items-center justify-center flex-row',
  btnCancel: 'bg-slate-200 active:bg-slate-300',
  btnConfirm: 'active:opacity-80',
  txtCancel: 'font-semibold text-slate-800',
  txtConfirm: 'font-semibold text-white',
  spinner: 'mr-2',
};

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  visible,
  mode,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const confirmingRef = useRef(false);
  const { title, message, confirmText, cancelText, iconName, confirmColor } = mapContent[mode];
  const iconColorValue = confirmColor.includes('red') ? '#ef4444' : '#3b82f6';

  const handleCancel = useCallback(() => {
    if (loading) return;
    onCancel();
  }, [loading, onCancel]);

  const handleConfirm = useCallback(async () => {
    if (loading || confirmingRef.current) return;
    confirmingRef.current = true;
    try {
      await onConfirm();
      AccessibilityInfo.announceForAccessibility?.('Ação confirmada');
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
        className={modalStyles.overlay}
        accessibilityViewIsModal
        accessibilityRole="alert"
        accessibilityLabel={title}
      >
        <animation.FadeUp
          entering={animation.enter.fadeUp.damping(15).stiffness(120)}
          exiting={animation.exit.fadeUp}
          className={modalStyles.card}
        >
          <View className={modalStyles.iconWrapper}>
            <Ionicons name={iconName} size={36} color={iconColorValue} accessibilityLabel={`Ícone de ${title}`} />
            <Text className={modalStyles.title}>{title}</Text>
          </View>

          <Text className={modalStyles.message}>{message}</Text>

          <View className={modalStyles.buttonsRow}>
            {cancelText && (
              <TouchableOpacity
                onPress={handleCancel}
                disabled={loading}
                className={`${modalStyles.btnBase} ${modalStyles.btnCancel}`}
                accessibilityRole="button"
                accessibilityLabel={cancelText}
              >
                <Text className={modalStyles.txtCancel}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleConfirm}
              disabled={loading}
              className={`${modalStyles.btnBase} ${confirmColor}`}
              style={{ opacity: loading ? 0.8 : 1 }}
              accessibilityRole="button"
              accessibilityLabel={loading ? 'Aguarde' : confirmText}
              accessibilityState={{ busy: loading, disabled: loading }}
            >
              {loading && <ActivityIndicator size="small" color="#fff" className={modalStyles.spinner} />}
              <Text className={modalStyles.txtConfirm}>
                {loading ? 'Aguarde...' : confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </animation.FadeUp>
      </View>
    </Modal>
  );
};

export default memo(ModalConfirmation);