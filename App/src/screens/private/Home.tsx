import React from 'react';
import Constants from 'expo-constants'; 

import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/src/navigation/Routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import CardMeuContrato from '@/src/components/cards/CardMeuContrato';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const statusBarHeight = Constants.statusBarHeight; 

function Home() {
    const navigation = useNavigation<NavigationProp>()

    const handleNavigation = {
        perfil: () => navigation.navigate('Perfil'),
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: statusBarHeight + 10}}>
                <View className='flex-row items-center justify-between pb-10'>

                    <View className='flex-row items-center gap-2.5'>
                        <TouchableOpacity onPress={handleNavigation.perfil}>
                            <Image source={require('../../assets/image/imagemUser.png')} />
                        </TouchableOpacity>

                        <Text className='text-[20px] font-bold'>
                            Hello, Lucas Pedrozo!
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons name="notifications-circle-outline" size={30} color="black" />
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
