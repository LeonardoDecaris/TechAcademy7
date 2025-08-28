import React, { useEffect } from 'react';

import { Image, ScrollView } from 'react-native';
import { TouchableOpacity, SafeAreaView, Text, View } from 'react-native';

import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import GetdadosUsuario from '@/src/hooks/get/GetDadosUsuario';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const statusBarHeight = Constants.statusBarHeight;

function Home() {

    const BlocoLogoStyle = "h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center"
    const logoStyle = "text-[20px] font-bold text-white"

    const navigation = useNavigation<NavigationProp>()
    const handleNavigation = { perfil: () => navigation.navigate('Perfil') }
    
    const { logout } = useAuth();
    const { DadosUsuario, getUserById, iniciaisUsuario, nomeExibicao } = GetdadosUsuario();

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
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: statusBarHeight + 10 }}>
                <View className='flex-row items-center justify-between pb-10'>
                    <View className='flex-row items-center gap-2.5'>

                        <TouchableOpacity onPress={handleNavigation.perfil} className={BlocoLogoStyle}>
                            {DadosUsuario?.imagemUsuario_id?.url ? (
                                <Image source={{ uri: DadosUsuario.imagemUsuario_id.url }} className='w-[50px] h-[50px] rounded-full' />
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;
