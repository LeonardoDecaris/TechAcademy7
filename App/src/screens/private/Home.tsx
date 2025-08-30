import React, { useEffect, useCallback, useState } from 'react';

import { Image, ScrollView, RefreshControl } from 'react-native';
import { TouchableOpacity, SafeAreaView, Text, View } from 'react-native';

import { BASE_URL } from '@env';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthContext';

import GetdadosUsuario from '@/src/hooks/get/GetDadosUsuario';
import AcessoRapido from '@/src/components/base/AcessoRapido';
import CardMeuContrato from '@/src/components/cards/CardMeuContrato';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const statusBarHeight = Constants.statusBarHeight;

function Home() {
    
    const logoStyle = "text-[20px] font-bold text-white"
    const BlocoLogoStyle = "h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center"
    
    const { logout } = useAuth();
    const navigation = useNavigation<NavigationProp>()
    
    const [refreshing, setRefreshing] = useState(false);
    const { dadosUsuario, getDadosUsuario, iniciasNomeUsuario, nomeAbreviado } = GetdadosUsuario();
    const imagemUrl = dadosUsuario?.image?.imgUrl ? `${BASE_URL}${dadosUsuario.image.imgUrl}` : null;

    const handleNavigation = {
        perfil: () => navigation.navigate('Perfil'),
        detalheFrete: () => navigation.navigate('DetalhesFrete')
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getDadosUsuario();
        setRefreshing(false);
    }, [getDadosUsuario]);

    useEffect(() => {
        getDadosUsuario();
    }, [getDadosUsuario]);

    const handleLogout = async () => { await logout(); navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] }); };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: statusBarHeight + 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>             
                    
                    <View className='flex-row items-center justify-between pb-10'>
                        <View className='flex-row items-center gap-2.5'>

                            <TouchableOpacity onPress={handleNavigation.perfil} className={BlocoLogoStyle}>
                                {imagemUrl ? (
                                    <Image source={{ uri: imagemUrl }} className='w-[50px] h-[50px] rounded-full' />
                                ) : (
                                    <Text className={logoStyle}>{iniciasNomeUsuario}</Text>
                                )}
                            </TouchableOpacity>

                            <Text className='text-[20px] font-bold'>Hello, {nomeAbreviado ?? 'Usuário'}!</Text>
                        </View>

                        <TouchableOpacity onPress={handleLogout} accessibilityLabel="Logout">
                            <Ionicons name="log-out-outline" size={30} color="black" />
                        </TouchableOpacity>

                    </View>

                <CardMeuContrato
                    motorista={dadosUsuario?.nome}
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