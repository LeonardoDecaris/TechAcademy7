import { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BASE_URL } from '@env';
import GetdadosUsuario from "@/src/hooks/get/GetDadosUsuario";

import Constants from "expo-constants";
import CardCarga from "@/src/components/cards/CardGarca";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const statusBarHeight = Constants.statusBarHeight;

function DetalhesFrete() {
    const navigation = useNavigation<NavigationProp>()
    const handleNavigation = {
        perfil: () => navigation.getParent()?.navigate('Perfil'),
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
        getUserById()
    }, [getUserById])

    

    return (
         <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: statusBarHeight }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            
                <View className='flex-row items-center gap-2.5 pb-5'>

                    <TouchableOpacity onPress={handleNavigation.perfil} className="">
                        {imagemUrl ? (
                            <Image source={{ uri: imagemUrl }} className='w-20 h-20 rounded-full' />
                        ) : (
                            <Text className="">{iniciaisUsuario}</Text>
                        )}
                    </TouchableOpacity>

                    <View>
                        <Text className='text-base font-bold'>{nomeExibicao}</Text>
                        <Text className='text-[12px] font-semibold text-black/60'>{DadosUsuario?.email}</Text>
                        <Text className='text-[12px] font-semibold text-black/60'>Categoria: {DadosUsuario?.cnh}</Text>
                    </View>

                </View>

                <CardCarga
                    nome="Reboque Caçamba"
                    tipo="Cascalho"
                    peso="14"
                    saida="São Paulo"
                    destino="Rio de Janeiro"
                    logoEmpresa=""
                    imagemCarga=""
                    valor="1.500,00"
                />


            </ScrollView>
        </SafeAreaView>
    )
}

export default DetalhesFrete;