import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, RefreshControl, Image, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BASE_URL } from '@env';
import { useAuth } from '@/src/context/AuthContext';
import LogoutModal from '@/src/components/modal/AlertLogout';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ButtonPadrao } from '@/src/components/form/Buttons';
import AcessoRapidoPerfil from '@/src/components/base/AcessoRapidoPerfil';

import AlertDeleteUser from '@/src/components/modal/AlterDeleteUser';
import useDeleteUsuario from '@/src/hooks/hookUser/useDeleteUsuario';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function Profile() {

	const logoInical = "rounded-full bg-gray-200 items-center justify-center"
	const logoStyle = "w-28 h-28 absolute -bottom-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ";

	const { logout } = useAuth();
	const navigation = useNavigation<NavigationProp>()
	const { deleteUsuario } = useDeleteUsuario();

	const [loggingOut, setLoggingOut] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalImageVisible, setModalImageVisible] = useState(false);
	const [deletingAccount, setDeletingAccount] = useState(false);

	const handleNavigation = {
		newPassword: () => navigation.navigate("NewPassword"),
		editProfile: () => navigation.navigate("EditProfile"),
		RegisterVehicle: () => navigation.navigate("RegisterVehicle"),
		myVehicle: () => navigation.navigate("MyVehicle"),
	};

	const [refreshing, setRefreshing] = useState(false);

	const { userData, iniciasNomeUsuario, nomeAbreviado, getUserData } = useGetUserData();
	const { getVehicleData, veiculo } = useGetVehicleData();

	const insets = useSafeAreaInsets();
	const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await getUserData();
		await getVehicleData();
		setRefreshing(false);
	}, [getUserData]);

	useEffect(() => {
		getUserData();
		getVehicleData();
	}, [getUserData, getVehicleData]);

	const handleConfirmLogout = async () => {
		try {
			setLoggingOut(true);
			await logout();
			setModalVisible(false);
			navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
		} finally {
			setLoggingOut(false);
		}
	};


	return (
		<View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 10, paddingTop: insets.top + 10 }}>
			<ScrollView
				contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 140 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<View className="w-full relative">
					<Image source={require('../../assets/image/image.png')} style={{ width: "100%", height: 130 }} className='rounded-2xl' />
					{imagemUrl ? (
						<TouchableOpacity onPress={() => setModalImageVisible(true)}>
							<Image source={{ uri: imagemUrl }} className={`${logoStyle}`} />
						</TouchableOpacity>
					) : (
						<View className={`${logoStyle} ${logoInical} shadow-[0_2px_6px_rgba(0,0,0,0.25)] `}>
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

				<Text className='text-base text-black/60 font-semibold pt-5 pl-5'>Informações pessoais</Text>

				<View className='py-2.5 gap-5'>
					<AcessoRapidoPerfil titulo="Editar dados pessoais" tipo="user-edit" onPress={handleNavigation.editProfile} />

					{!veiculo?.veiculo ? (
						<>
							<AcessoRapidoPerfil titulo="Cadastrar veiculo" tipo="truck" onPress={handleNavigation.RegisterVehicle} />
						</>
					) : (
						<>
							<AcessoRapidoPerfil titulo="Meu veiculo" tipo="truck" onPress={handleNavigation.myVehicle} />
						</>
					)}

					<AcessoRapidoPerfil titulo="Cancelar meu Cadastro" loginOut tipo="user-edit" onPress={() => setDeletingAccount(true)} />
				</View>

				<Text className='text-base text-black/60 font-semibold pt-5 pl-5'>Funcionamento do sistema</Text>

				<View className='flex-row justify-between items-center pt-5'>
					<ButtonPadrao
						title="Redefinir Senha"
						typeButton="normal"
						classname="px-5"
						onPress={handleNavigation.newPassword}
					/>

					<ButtonPadrao
						title="Logout"
						typeButton="logOutExcluir"
						classname="px-5"
						onPress={() => setModalVisible(true)}
					/>
				</View>

				<AlertDeleteUser
					visible={deletingAccount}
					onConfirm={deleteUsuario}
					onCancel={() => setDeletingAccount(false)}
				/>
				<LogoutModal
					visible={modalVisible}
					loading={loggingOut}
					onCancel={() => setModalVisible(false)}
					onConfirm={handleConfirmLogout}
				/>
			</ScrollView >
		</View >
	)
}

export default Profile;