import React, { useCallback, useEffect, useState } from 'react'

import { BASE_URL } from '@env';
import Constants from 'expo-constants';

import AcessoRapidoPerfil from '@/src/components/base/AcessoRapidoPerfil';
import { ScrollView, SafeAreaView, RefreshControl, Image, Text, View } from 'react-native'

import { useAuth } from '@/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ButtonPadrao } from '@/src/components/form/Buttons';
import LogoutModal from '@/src/components/modal/AlertLogout';
import useGetDadosUsuario from '@/src/hooks/get/GetDadosUsuario';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const statusBarHeight = Constants.statusBarHeight;

export default function Perfil() {
	
	const navigation = useNavigation<NavigationProp>()
	const { logout } = useAuth();
	const [modalVisible, setModalVisible] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);
	const handleNavigation = { editarPerfil: () => navigation.navigate("EditarPerfil") };

	const logoStyle = "w-28 h-28 absolute -bottom-[90px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ";
	const logoInical = "rounded-full bg-gray-200 items-center justify-center"

	const [refreshing, setRefreshing] = useState(false);
    const { dadosUsuario, iniciasNomeUsuario, nomeAbreviado, getDadosUsuario, } = useGetDadosUsuario();

	const imagemUrl = dadosUsuario?.imagemUsuario?.imgUrl ? `${BASE_URL}${dadosUsuario.imagemUsuario.imgUrl}` : ''

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getDadosUsuario();
        setRefreshing(false);
    }, [getDadosUsuario]);

    useEffect(() => {
        getDadosUsuario();
    }, [getDadosUsuario]);

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
			<ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: statusBarHeight + 10}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View className="w-full relative">
					<Image source={require('../../assets/image/bg.png')} style={{ width: "100%", height: 130 }} className='rounded-2xl'/>
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
					<Text className="text-black/60 text-center">{dadosUsuario?.email}</Text>
				</View>
				
				<Text className='text-[12px] text-black/60 font-semibold pt-5 pl-5'>Informações pessoais</Text>

				<View className='py-2.5 gap-4'>
					<AcessoRapidoPerfil titulo="Meus dados" onPress={handleNavigation.editarPerfil} />
					<AcessoRapidoPerfil titulo="Configurações" onPress={() => {}} />
				</View>

				<Text className='text-[12px] text-black/60 font-semibold pt-5 pl-5'>Funcionamento do sistema</Text>
				
					<View className='items-end'>
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