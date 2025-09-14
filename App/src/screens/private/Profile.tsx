import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, RefreshControl, Image, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BASE_URL } from '@env';
import { useAuth } from '@/src/context/AuthContext';
import LogoutModal from '@/src/components/modal/AlertLogout';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ButtonPadrao } from '@/src/components/form/Buttons';
import AcessoRapidoPerfil from '@/src/components/base/AcessoRapidoPerfil';

import useDeleteUsuario from '@/src/hooks/hookUser/useDeleteUsuario';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import ModalConfirmation from '@/src/components/modal/ModalConfirmation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const quickAccessWrapperStyle = 'py-2.5 gap-5';
const actionsWrapperStyle = 'flex-row justify-between items-center pt-5';
const sectionTitleStyle = 'text-base text-black/60 font-semibold pt-5 pl-5';
const logoInitialStyle = 'rounded-full bg-gray-200 items-center justify-center';
const avatarStyle = 'w-28 h-28 absolute -bottom-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full';

const Profile = () => {

	const insets = useSafeAreaInsets();
	const containerStyle = useMemo(() => ({ flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingTop: insets.top + 10 }), [insets.top]);

	const { logout } = useAuth();
	const navigation = useNavigation<NavigationProp>()

	const { deleteUsuario } = useDeleteUsuario();
	const [loggingOut, setLoggingOut] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [deletingAccount, setDeletingAccount] = useState(false);
	const [modalImageVisible, setModalImageVisible] = useState(false);

	const goMyVehicle = useCallback(() => navigation.navigate('MyVehicle'), [navigation]);
	const goNewPassword = useCallback(() => navigation.navigate('NewPassword'), [navigation]);
	const goEditProfile = useCallback(() => navigation.navigate('EditProfile'), [navigation]);
	const goRegisterVehicle = useCallback(() => navigation.navigate('RegisterVehicle'), [navigation]);

	const { getVehicleData, veiculo } = useGetVehicleData();
	const { userData, iniciasNomeUsuario, nomeAbreviado, getUserData } = useGetUserData();

	const imagemUrl = useMemo(
		() => (userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''),
		[userData?.imagemUsuario?.imgUrl]
	);

	const handleConfirmLogout = useCallback(async () => {
		setLoggingOut(true);
		try {
			await logout();
			setModalVisible(false);
			navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
		} catch (error) {
		} finally {
			setLoggingOut(false);
		}
	}, [logout, navigation]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		try {
			await Promise.all([getUserData(), getVehicleData()]);
		} finally {
			setRefreshing(false);
		}
	}, [getUserData, getVehicleData]);

	useEffect(() => {
		(async () => {
			await Promise.all([getUserData(), getVehicleData()]);
		})();
	}, [getUserData, getVehicleData]);

	return (
		<View style={containerStyle}>
			<ScrollView
				contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 140 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<View className='w-full relative'>
					<Image source={require('../../assets/image/image.png')} style={{ width: '100%', height: 130 }} className='rounded-2xl' />
					{imagemUrl ? (
						<TouchableOpacity onPress={() => setModalImageVisible(true)}>
							<Image source={{ uri: imagemUrl }} className={avatarStyle} />
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
							<TouchableOpacity className='absolute top-10 right-10 z-10' onPress={() => setModalImageVisible(false)}>
								<Text className='text-white text-2xl'>✕</Text>
							</TouchableOpacity>
							<TouchableWithoutFeedback>
								<Image source={{ uri: imagemUrl }} style={{ minWidth: 100, minHeight: 100, width: 300, height: 300, borderRadius: 20 }} resizeMode="contain" />
							</TouchableWithoutFeedback>
						</View>
					</TouchableWithoutFeedback>
				</Modal>

				<View className="pt-14 w-full">
					<Text className="font-bold text-2xl text-black text-center">{nomeAbreviado}</Text>
					<Text className="text-black/60 text-center">{userData?.email}</Text>
				</View>

				<Text className={sectionTitleStyle}>Informações pessoais</Text>

				<View className={quickAccessWrapperStyle}>
					<AcessoRapidoPerfil titulo='Editar dados pessoais' tipo='user-edit' onPress={goEditProfile} />
					{veiculo?.veiculo ? (
						<AcessoRapidoPerfil titulo='Meu veiculo' tipo='truck' onPress={goMyVehicle} />
					) : (
						<AcessoRapidoPerfil titulo='Cadastrar veiculo' tipo='truck' onPress={goRegisterVehicle} />
					)}
					<AcessoRapidoPerfil titulo='Cancelar meu Cadastro' loginOut tipo='user-edit' onPress={() => setDeletingAccount(true)} />
				</View>

				<Text className={sectionTitleStyle}>Funcionamento do sistema</Text>

				<View className={actionsWrapperStyle}>
					<ButtonPadrao
						title="Redefinir Senha"
						typeButton="normal"
						classname="px-5"
						onPress={goNewPassword}
					/>

					<ButtonPadrao
						title="Logout"
						typeButton="logOutExcluir"
						classname="px-5"
						onPress={() => setModalVisible(true)}
					/>
				</View>

				<ModalConfirmation
					mode='cancel_contract'
					visible={deletingAccount}
					loading={loggingOut}
					onConfirm={deleteUsuario}	
					onCancel={() => setDeletingAccount(false)}
				/>
				<ModalConfirmation
					mode='logout'
					visible={modalVisible}
					onConfirm={handleConfirmLogout}
					onCancel={() => setModalVisible(false)}
					loading={loggingOut}
				/>
			</ScrollView >
		</View >
	)
};

export default memo(Profile);