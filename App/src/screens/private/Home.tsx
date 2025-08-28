import React, { useMemo } from 'react';

import { ScrollView } from 'react-native';
import { TouchableOpacity, SafeAreaView, Text, View  } from 'react-native';

import Constants from 'expo-constants'; 
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import CardMeuContrato from '@/src/components/cards/CardMeuContrato';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDisplayName, getInitials } from '@/src/hooks/get/GetDadosHome';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const statusBarHeight = Constants.statusBarHeight; 

function Home() {
    const { userName, logout } = useAuth();
    const navigation = useNavigation<NavigationProp>()
    const handleNavigation = { perfil: () => navigation.navigate('Perfil') }

    const displayName = useMemo(() => getDisplayName(userName ?? undefined), [userName]);
    const initials = useMemo(() => getInitials(userName ?? undefined), [userName]);

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
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: statusBarHeight + 10}}>
                <View className='flex-row items-center justify-between pb-10'>

                    <View className='flex-row items-center gap-2.5'>
                       
                        <TouchableOpacity onPress={handleNavigation.perfil} className='h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center'>
                            <Text className='text-[16px] font-bold'>
                                {initials}
                            </Text>
                        </TouchableOpacity>

                        <Text className='text-[20px] font-bold'>
                          Hello, {displayName}!
                        </Text>
                    </View>

                    <TouchableOpacity onPress={handleLogout} accessibilityLabel="Logout">
                        <Ionicons name="log-out-outline" size={24} color="black" />
                    </TouchableOpacity>

                </View>

                <CardMeuContrato
                    nome="Reboque Caçamba"
                    tipo="Cascalho"
                    peso="14t"
                    saida="Campo Mourão PR"
                    destino="Rio de Janeiro"
                    logoEmpresa="https://example.com/logo.png"
                    imagemCarga="https://example.com/carga.png"
                    valor="4000"
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;
