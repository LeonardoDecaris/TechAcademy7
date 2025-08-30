import React, { useEffect, useCallback, useState } from 'react';

import { Image, ScrollView, RefreshControl } from 'react-native';
import { TouchableOpacity, SafeAreaView, Text, View } from 'react-native';

import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthContext';
import GetdadosUsuario from '@/src/hooks/get/GetDadosUsuario';
import AcessoRapido from '@/src/components/base/AcessoRapido';
import CardMeuContrato from '@/src/components/cards/CardMeuContrato';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BASE_URL } from '@env';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const statusBarHeight = Constants.statusBarHeight;

function Home() {

    const BlocoLogoStyle = "h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center"
    const logoStyle = "text-[20px] font-bold text-white"

    const { logout } = useAuth();
    const navigation = useNavigation<NavigationProp>()
    const handleNavigation = {
        perfil: () => navigation.navigate('Perfil'),
        detalheFrete: () => navigation.navigate('DetalhesFrete')
    }


    const { DadosUsuario, getUserById, iniciaisUsuario, nomeExibicao } = GetdadosUsuario();
    const imagemUrl = DadosUsuario?.imagemUsuario?.imgUrl ? `${BASE_URL}${DadosUsuario.imagemUsuario.imgUrl}` : null;

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUserById();
        setRefreshing(false);
    }, [getUserById]);

    useEffect(() => {
        getUserById();
    }, [getUserById]);

    const handleLogout = async () => {
        try {
            await logout();
            navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
        } catch (error) {
            console.error('Erro ao deslogar:', error);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: statusBarHeight + 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View className='flex-row items-center justify-between pb-10'>
                    <View className='flex-row items-center gap-2.5'>

                        <TouchableOpacity onPress={handleNavigation.perfil} className={BlocoLogoStyle}>
                            {imagemUrl ? (
                                <Image source={{ uri: imagemUrl }} className='w-[50px] h-[50px] rounded-full' />
                            ) : (
                                <Text className={logoStyle}>{iniciaisUsuario}</Text>
                            )}
                        </TouchableOpacity>

                        <Text className='text-[20px] font-bold'>Hello, {nomeExibicao ?? 'Usuário'}!</Text>

                    </View>

                    <TouchableOpacity onPress={handleLogout} accessibilityLabel="Logout">
                        <Ionicons name="log-out-outline" size={30} color="black" />
                    </TouchableOpacity>

                </View>

                <CardMeuContrato
                    motorista={DadosUsuario?.nome}
                    nome="Reboque Caçamba"
                    tipo="Cascalho"
                    peso="14"
                    saida="São Paulo"
                    destino="Rio de Janeiro"
                    logoEmpresa=""
                    imagemCarga=""
                    valor="1.500,00"
                />

                <AcessoRapido onPress={handleNavigation.detalheFrete} title='Detalhes do frete' />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;
