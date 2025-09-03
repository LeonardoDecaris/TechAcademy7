import React, { useEffect, useCallback, useState } from 'react';

import { Image, ScrollView, RefreshControl, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';

import { BASE_URL } from '@env';
import Constants from 'expo-constants';
import { useAuth } from '@/src/context/AuthContext';

import { Ionicons } from '@expo/vector-icons';
import useGetUserData from '@/src/hooks/get/useGetUserData';
import AlertLogout from '@/src/components/modal/AlertLogout';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CardFreight from '@/src/components/cards/CardFreight';
import VehicleCard from '@/src/components/cards/VehicleCard';
import AcessoRapido from '@/src/components/base/AcessoRapido';
import CardMyContract from '@/src/components/cards/CardMyContract';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const statusBarHeight = Constants.statusBarHeight;

function Home() {
    
    const logoStyle = "text-[20px] font-bold text-white"
    const BlocoLogoStyle = "h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center"
    
    const { logout } = useAuth();
    const navigation = useNavigation<NavigationProp>()
    
    const [refreshing, setRefreshing] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const { userData, getUserData, iniciasNomeUsuario, nomeAbreviado } = useGetUserData();

    const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : '';

    const handleNavigation = {
        profile: () => navigation.navigate('Profile'),
        detailsEnvio: () => navigation.navigate('DetailsEnvio'),
        myVehicle: () => navigation.navigate('MyVehicle')
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUserData();
        setRefreshing(false);
    }, [getUserData]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const handleLogout = async () => { await logout(); navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] }); };


    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor: '#FFFFFF' }}>
           <ScrollView
                contentContainerStyle={{ paddingHorizontal: 6, marginTop: statusBarHeight, paddingBottom: 130 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >

                <View className='flex-row items-center justify-between pb-10 '>
                    <View className='flex-row items-center gap-2.5'>

                        <TouchableOpacity onPress={handleNavigation.profile} className={BlocoLogoStyle}>
                            {imagemUrl ? (
                                <Image source={{ uri: imagemUrl }} className='w-[50px] h-[50px] rounded-full bg-gray-200' />
                            ) : (
                                <Text className={logoStyle}>{iniciasNomeUsuario}</Text>
                            )}
                        </TouchableOpacity>

                        <Text className='text-2xl font-bold'>Olá, {nomeAbreviado ?? 'Usuário'}!</Text>
                    </View>

                    <TouchableOpacity onPress={() => setShowLogout(true)} accessibilityLabel="Logout">
                        <Ionicons name="log-out-outline" size={30} color="black" />
                    </TouchableOpacity>

                </View>
   
                <CardMyContract
                    motorista={userData?.nome}
                    nome="Sem carga"
                    tipo="Nenhum"
                    peso="0"
                    saida="Nenhum"
                    destino="Nenhum"
                    logoEmpresa=""
                    imagemCarga=""
                    valor="Sem valor"
                />

                <AcessoRapido onPress={handleNavigation.detailsEnvio} title='Detalhes do envio' />

                <CardFreight 
                    tipo="Nenhum" 
                    peso="0"
                    destino="Nenhum"
                    progresso={0}
                />

                <AcessoRapido onPress={handleNavigation.myVehicle} title='Meu Veículo' />

                <VehicleCard
                
                />

            </ScrollView>
            <AlertLogout visible={showLogout} onCancel={() => setShowLogout(false)} onConfirm={async () => { setShowLogout(false); await handleLogout(); }} />
        </SafeAreaView>
    )
}

export default Home;