import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
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

const AlertLogout: React.FC<Props> = ({
	visible,
	onConfirm,
	onCancel,
	title = 'Sair da conta',
	message = 'Tem certeza que deseja sair?',
	confirmText = 'Sair',
	cancelText = 'Cancelar',
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
			<BlurView intensity={35} tint="dark" style={StyleSheet.absoluteFill} />
			<View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(10px)' }]} />
			<animation.FadeUp>
				<View className="w-11/12 max-w-[360px] rounded-lg bg-white p-6">
					<View className="items-center mb-4">
						<Ionicons name="log-out-outline" size={36} color="#ef4444" />
						<Text className="mt-2 text-lg font-bold">{title}</Text>
					</View>

					<Text className="text-center text-gray-600 mb-6">{message}</Text>

					<View className="flex-row gap-2">
						<TouchableOpacity
							onPress={onCancel}
							className="flex-1 h-11  rounded-lg bg-gray-200 items-center justify-center"
						>
							<Text className="font-semibold text-gray-800">{cancelText}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={onConfirm}
							disabled={loading}
							className="flex-1 h-11  rounded-lg items-center justify-center"
							style={{ backgroundColor: '#ef4444', opacity: loading ? 0.85 : 1 }}
						>
							<Text className="font-semibold text-white">
								{loading ? 'Saindo...' : confirmText}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</animation.FadeUp>
		</View>
	</Modal>
);

export default AlertLogout;