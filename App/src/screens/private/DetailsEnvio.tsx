import { useCallback, useEffect, useState } from "react";

import { RefreshControl } from "react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BASE_URL } from '@env';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CardCargo from "@/src/components/cards/CardCargo";
import useGetUserData from "@/src/hooks/hookAuth/hookUser/useGetUserData";
import CardFreight from "@/src/components/cards/CardFreight";
import InformationBox from "@/src/components/form/InformarionBox";


type NavigationProp = NativeStackNavigationProp<RootStackParamList>


function DetailsEnvio() {
    const navigation = useNavigation<NavigationProp>()
    const handleNavigation = { profile: () => navigation.navigate('MainTabs', { screen: 'Profile' }) }

    const { userData, getUserData, nomeAbreviado, iniciasNomeUsuario } = useGetUserData();
    const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getUserData();
        setRefreshing(false);
    }, [getUserData]);

    useEffect(() => {
        getUserData()
    }, [getUserData]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 10 }}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                <View className='flex-row items-center gap-2.5 pb-5'>

                    <TouchableOpacity onPress={handleNavigation.profile} className="">
                        {imagemUrl ? (
                            <Image source={{ uri: imagemUrl }} className='w-20 h-20 rounded-full' />
                        ) : (
                            <Text className="">{iniciasNomeUsuario}</Text>
                        )}
                    </TouchableOpacity>

                    <View>
                        <Text className='text-base font-bold'>{nomeAbreviado}</Text>
                        <Text className='text-sm font-semibold text-black/60'>{userData?.email}</Text>
                        <Text className='text-sm font-semibold text-black/60'>Categoria: {userData?.cnh}</Text>
                    </View>

                </View>


                <CardCargo
                    nome="Reboque Caçamba"
                    tipo="Cascalho"
                    peso="14"
                    saida="São Paulo"
                    destino="Rio de Janeiro"
                    logoEmpresa=""
                    imagemCarga=""
                    valor="1.500,00"
                />

                <View className="py-2.5" />

                <CardFreight
                    tipo="Nenhum"
                    peso="0"
                    destino="Juranda PR"
                    progresso={3}
                />

                <View className="py-5 flex-col gap-2.5">
                    <Text className="text-black font-semibold pl-2.5">Informações de Carga</Text>

                    <InformationBox
                        title="Cidade de Origem"
                        descricao=" Campo Mourão PR"
                    />
                    <InformationBox
                        title="Destino Final"
                        descricao=" Juranda PR"
                    />
                    <InformationBox
                        title="Incio"
                        descricao=" 19:30 | 04/08/2025"
                    />
                    <InformationBox
                        title="Chegada"
                        descricao=" Sem Previsão"
                    />
                    <InformationBox
                        title="Tipo"
                        descricao=" Minerais Pesados"
                    />
                    <InformationBox
                        title="Peso:"
                        descricao="14t"
                    />
                    <InformationBox
                        title="Valor da Carga"
                        descricao=" R$ 500.000,00"
                    />
                    <InformationBox
                        title="Frete"
                        descricao=" R$ 4.400"
                    />

                </View>

            </ScrollView>
        </View>
    )
}

export default DetailsEnvio;