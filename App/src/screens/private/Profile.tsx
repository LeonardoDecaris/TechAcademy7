import React, { useEffect, useCallback, useState, useMemo, memo } from 'react';
import { ScrollView, RefreshControl, Text, View } from 'react-native';

import { BASE_URL } from '@env';
import { useAuth } from '@/src/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ButtonPadrao } from '@/src/components/form/Buttons';
import AcessoRapidoPerfil from '@/src/components/base/AcessoRapidoPerfil';

import TopoProfile from '@/src/components/base/TopoProfile';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import useDeleteUsuario from '@/src/hooks/hookUser/useDeleteUsuario';
import ModalConfirmation from '@/src/components/modal/ModalConfirmation';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const quickAccessWrapperStyle = 'py-2.5 gap-5';
const actionsWrapperStyle = 'flex-row justify-end items-center pt-5';
const sectionTitleStyle = 'text-base text-black/60 font-semibold pt-5 pl-5';
const nameInitialsStyle = 'font-bold text-2xl text-black text-center';

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
	const goEditProfile = useCallback(() => navigation.navigate('EditProfile'), [navigation]);
	const goRegisterVehicle = useCallback(() => navigation.navigate('RegisterVehicle'), [navigation]);

	const { getVehicleData, veiculo } = useGetVehicleData();
	const { userData, iniciasNomeUsuario, nomeAbreviado, getUserData } = useGetUserData();

	const hasVehicle = Boolean(veiculo?.veiculo);
	const imagemUrl = `${BASE_URL}${userData?.imagemUsuario?.imgUrl}`;

	const handleConfirmLogout = useCallback(async () => {
		setLoggingOut(true);
		try {
			await logout();
			setModalVisible(false);
			navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
		} catch (error) { } finally { setLoggingOut(false); }
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
		getUserData();
		getVehicleData();
	}, [getUserData, getVehicleData]);

	return (
		<View style={containerStyle}>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 140 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				showsVerticalScrollIndicator={false}
			>
				<TopoProfile
					imagemUrl={imagemUrl}
					modalImageVisible={modalImageVisible}
					iniciasNomeUsuario={iniciasNomeUsuario}
					setModalImageVisible={setModalImageVisible}
				/>

				<View className="pt-14 w-full">
					<Text className={nameInitialsStyle}>{nomeAbreviado}</Text>
					<Text className="text-black/60 text-center">{userData?.email}</Text>
				</View>

				<Text className={sectionTitleStyle}>Informações pessoais</Text>

				<View className={quickAccessWrapperStyle}>
					<AcessoRapidoPerfil titulo='Editar dados pessoais' tipo='user-edit' onPress={goEditProfile} />
					{hasVehicle ? (
						<AcessoRapidoPerfil titulo='Meu veiculo' tipo='truck' onPress={goMyVehicle} />
					) : (
						<AcessoRapidoPerfil titulo='Cadastrar veiculo' tipo='truck' onPress={goRegisterVehicle} />
					)}
					<AcessoRapidoPerfil titulo='Cancelar meu Cadastro' loginOut tipo='user-edit' onPress={() => setDeletingAccount(true)} />
				</View>

				<Text className={sectionTitleStyle}>Funcionamento do sistema</Text>

				<View className={actionsWrapperStyle}>
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