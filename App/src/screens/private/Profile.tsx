import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, RefreshControl, Image, Text, View } from 'react-native'

import { BASE_URL } from '@env';
import Constants from 'expo-constants';
import { useAuth } from '@/src/context/AuthContext';
import LogoutModal from '@/src/components/modal/AlertLogout';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useGetUserData from '@/src/hooks/get/useGetUserData';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import AcessoRapidoPerfil from '@/src/components/base/AcessoRapidoPerfil';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const statusBarHeight = Constants.statusBarHeight;

function Profile() {

	const logoInical = "rounded-full bg-gray-200 items-center justify-center"
	const logoStyle = "w-28 h-28 absolute -bottom-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ";
	
	const { logout } = useAuth();
	const navigation = useNavigation<NavigationProp>()

	const [loggingOut, setLoggingOut] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const handleNavigation = {
		newPassword: () => navigation.navigate("NewPassword"),
		editProfile: () => navigation.navigate("EditProfile"),
	};

	const [refreshing, setRefreshing] = useState(false);
    const { userData, iniciasNomeUsuario, nomeAbreviado, getUserData } = useGetUserData();

	const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUserData();
        setRefreshing(false);
    }, [getUserData]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

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
		<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 6, marginTop: statusBarHeight, paddingBottom: 140 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View className="w-full relative">
					<Image source={require('../../assets/image/image.png')} style={{ width: "100%", height: 130 }} className='rounded-2xl'/>
					 {imagemUrl ? (
						<Image source={{ uri: imagemUrl }} className={`${logoStyle}`}  />
					) : (
						<View className={`${logoStyle} ${logoInical} shadow-[0_2px_6px_rgba(0,0,0,0.25)] `}>
							<Text className='font-bold text-black text-3xl'>{iniciasNomeUsuario}</Text>
						</View>
					)}
				</View>

				<View className="pt-14 w-full">
					<Text className="font-bold text-2xl text-black text-center">{nomeAbreviado}</Text>
					<Text className="text-black/60 text-center">{userData?.email}</Text>
				</View>
				
				<Text className='text-[12px] text-black/60 font-semibold pt-5 pl-5'>Informações pessoais</Text>

				<View className='py-2.5 gap-5'>
					<AcessoRapidoPerfil titulo="Meus dados" tipo="user-edit" onPress={handleNavigation.editProfile} />
					<AcessoRapidoPerfil titulo="Configurações" tipo="truck" onPress={() => {}} />
				</View>

				<Text className='text-[12px] text-black/60 font-semibold pt-5 pl-5'>Funcionamento do sistema</Text>
				
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

					<LogoutModal
						visible={modalVisible}
						loading={loggingOut}
						onCancel={() => setModalVisible(false)}
						onConfirm={handleConfirmLogout}
					/>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Profile;