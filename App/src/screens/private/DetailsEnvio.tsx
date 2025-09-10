import { useCallback, useEffect, useState, useMemo, memo } from 'react';
import { RefreshControl, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { BASE_URL } from '@env';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CardCargo from '@/src/components/cards/CardCargo';
import CardFreight from '@/src/components/cards/CardFreight';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import InformationBox from '@/src/components/form/InformarionBox';


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const containerBG = '#FFFFFF';
const avatarFallbackTextStyle = 'text-lg font-bold';
const cargoInfoWrapperStyle = 'py-5 flex-col gap-2.5';
const headerRowStyle = 'flex-row items-center gap-2.5 pb-5';
const cargoInfoTitleStyle = 'text-black font-semibold pl-2.5';

const DetailsEnvio = () => {
    const navigation = useNavigation<NavigationProp>();
    const goProfile = useCallback(() => navigation.navigate('MainTabs', { screen: 'Profile' }), [navigation]);

    const { userData, getUserData, nomeAbreviado, iniciasNomeUsuario } = useGetUserData();

    const [refreshing, setRefreshing] = useState(false);

    const imagemUrl = useMemo(
        () => (userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : ''),
        [userData?.imagemUsuario?.imgUrl]
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await getUserData();
        } finally {
            setRefreshing(false);
        }
    }, [getUserData]);

    useEffect(() => {
        (async () => {
            await getUserData();
        })();
    }, [getUserData]);

    return (
        <View style={{ flex: 1, backgroundColor: containerBG, paddingTop: 10 }}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                <View className={headerRowStyle}>
                    <TouchableOpacity onPress={goProfile} accessibilityLabel='Ir para perfil'>
                        {imagemUrl ? (
                            <Image source={{ uri: imagemUrl }} className='w-20 h-20 rounded-full' />
                        ) : (
                            <Text className={avatarFallbackTextStyle}>{iniciasNomeUsuario}</Text>
                        )}
                    </TouchableOpacity>

                    <View>
                        <Text className='text-base font-bold'>{nomeAbreviado}</Text>
                        <Text className='text-sm font-semibold text-black/60'>{userData?.email}</Text>
                        <Text className='text-sm font-semibold text-black/60'>Categoria: {userData?.cnh}</Text>
                    </View>
                </View>

                <CardCargo
                    nome='Nenhum'
                    tipo='Nenhum'
                    peso=''
                    saida=''
                    destino=''
                    logoEmpresa=''
                    imagemCarga=''
                    valorFrete=''
                />

                <View className='py-2.5' />

                <CardFreight tipo='' peso='' destino='' progresso={0} />

                <View className={cargoInfoWrapperStyle}>
                    <Text className={cargoInfoTitleStyle}>Informações de Carga</Text>
                    <InformationBox title='Cidade de Origem' descricao='--' />
                    <InformationBox title='Destino Final' descricao='--' />
                    <InformationBox title='Incio' descricao='--' />
                    <InformationBox title='Chegada' descricao='--' />
                    <InformationBox title='Tipo' descricao='--' />
                    <InformationBox title='Peso:' descricao='--' />
                    <InformationBox title='Valor da Carga' descricao='--' />
                    <InformationBox title='Frete' descricao='--' />
                </View>
            </ScrollView>
        </View>
    );
};

export default memo(DetailsEnvio);