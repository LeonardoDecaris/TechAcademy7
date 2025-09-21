import React, { useCallback, useEffect, useState, useMemo, memo } from 'react';
import { RefreshControl, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { formatDateTime } from '@/src/utils/funcoes';
import CardCargo from '@/src/components/cards/CardCargo';
import CardFreight from '@/src/components/cards/CardFreight';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import InformationBox from '@/src/components/form/InformarionBox';
import AlertNotification from '@/src/components/modal/AlertNotification';

import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import useIniciarRota from '@/src/hooks/hookFreight/useIniciarRota';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import useConcluirFreight from '@/src/hooks/hookFreight/useConcluirFreigth';
import useGetFreightConfirm from '@/src/hooks/hookFreight/useGetFreightComfirm';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const containerBG = '#FFFFFF';
const avatarFallbackTextStyle = 'text-lg font-bold';
const cargoInfoWrapperStyle = 'py-5 flex-col gap-2.5';
const headerRowStyle = 'flex-row items-center gap-2.5 pb-5';
const cargoInfoTitleStyle = 'text-black font-semibold pl-2.5';
const actionRowStyle = 'w-full flex-row justify-end px-2.5 pt-5';

const DetailsEnvio = () => {

    const insets = useSafeAreaInsets();
    const containerStyle = useMemo(() => ({ flex: 1, backgroundColor: containerBG, paddingTop: insets.top + 10 }), [insets.top]);

    const navigation = useNavigation<NavigationProp>();
    const goProfile = useCallback(() => navigation.navigate('MainTabs', { screen: 'Profile' }), [navigation]);

    const [refreshing, setRefreshing] = useState(false);

    const { getVehicleData, veiculo: data } = useGetVehicleData();
    const { userData, getUserData, nomeAbreviado, iniciasNomeUsuario } = useGetUserData();
    const { getDados: getDadosFrete, closeSuccessNotification, mensage, success, successVisible, dadosFrete } = useGetFreightConfirm(data?.id_caminhoneiro || 0);
    const { iniciarRota, closeSuccessNotification: closeSuccessNotificationIniciarRota, mensage: mensageIniciarRota, success: successIniciarRota, successVisible: successVisibleIniciarRota } = useIniciarRota();
    const { concluirFrete, closeSuccessNotification: closeSuccessNotificationConcluirFrete, mensage: mensageConcluirFrete, success: successConcluirFrete, successVisible: successVisibleConcluirFrete } = useConcluirFreight();
    
    const handleIniciarRota = useCallback(() => {
        if (dadosFrete?.id_frete) iniciarRota(dadosFrete.id_frete.toString());
    }, [iniciarRota, dadosFrete?.id_frete]);

    const handleConcluirFrete = useCallback(() => {
        if (dadosFrete?.id_frete) concluirFrete(dadosFrete.id_frete.toString());
    }, [concluirFrete, dadosFrete?.id_frete]);
    
    const imagemUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : null;

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await Promise.all([getUserData(), getVehicleData()]);
            if (data?.id_caminhoneiro) await getDadosFrete();
        } finally {
            setRefreshing(false);
        }
    }, [getUserData, getVehicleData, getDadosFrete, data?.id_caminhoneiro]);

    useEffect(() => {
        getUserData();
        getVehicleData();
    }, [getUserData, getVehicleData]);

    useEffect(() => {
        if (data?.id_caminhoneiro) {
            getDadosFrete();
        }
    }, [data?.id_caminhoneiro, getDadosFrete]);

    return (
        <View style={containerStyle}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                <AlertNotification
                    visible={successVisible}
                    status={success as 'success' | 'error' | 'loading'}
                    messagem={mensage}
                    onDismiss={closeSuccessNotification}
                />

                <AlertNotification
                    visible={successVisibleIniciarRota}
                    status={successIniciarRota as 'success' | 'error' | 'loading'}
                    messagem={mensageIniciarRota}
                    onDismiss={closeSuccessNotificationIniciarRota}
                />

                <AlertNotification
                    visible={successVisibleConcluirFrete}
                    status={successConcluirFrete as 'success' | 'error' | 'loading'}
                    messagem={mensageConcluirFrete}
                    onDismiss={closeSuccessNotificationConcluirFrete}
                />

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
                    saida={dadosFrete?.saida || 'sem local'}
                    destino={dadosFrete?.destino || 'sem destino'}
                    nome={dadosFrete?.carga?.nome || 'Nenhum'}
                    peso={dadosFrete?.carga?.peso || '0'}
                    valorFrete={dadosFrete?.valor_frete || '0'}
                    tipo={dadosFrete?.carga?.tipoCarga?.nome || 'nenhum'}
                    imagemCarga={dadosFrete?.carga?.imagemCarga?.imgUrl || ''}
                    logoEmpresa={dadosFrete?.empresa?.imagemEmpresa?.imgUrl || ''}
                />

                <View className='py-2.5' />

                <CardFreight
                    destino={dadosFrete?.destino}
                    peso={dadosFrete?.carga?.peso}
                    tipo={dadosFrete?.carga?.tipoCarga?.nome}
                    progresso={dadosFrete?.status?.id_status}
                />

                <View className={cargoInfoWrapperStyle}>
                    <Text className={cargoInfoTitleStyle}>Informações de Carga</Text>
                    <InformationBox title='Peso' descricao={dadosFrete?.carga?.peso || 'sem peso'} />
                    <InformationBox title='Frete' descricao={dadosFrete?.valor_frete || 'sem frete'} />
                    <InformationBox title='Destino Final' descricao={dadosFrete?.destino || 'sem destino'} />
                    <InformationBox title='Cidade de Origem' descricao={dadosFrete?.saida || 'sem cidade'} />
                    <InformationBox title='Incio' descricao={formatDateTime(dadosFrete?.data_saida)} />
                    <InformationBox title='Tipo' descricao={dadosFrete?.carga?.tipoCarga?.nome || 'sem tipo'} />
                    <InformationBox title='Chegada' descricao={formatDateTime(dadosFrete?.data_chegada)} />
                    <InformationBox title='Valor da Carga' descricao={dadosFrete?.carga?.valor_carga || 'sem valor'} />
                </View>

                <View className={actionRowStyle}>
                    {dadosFrete?.status?.id_status === 1 ? (
                        <ButtonPadrao
                            title='Iniciar Percurso'
                            typeButton='aceite'
                            classname='px-5'
                            onPress={handleIniciarRota}
                        />
                    ) : (
                        <ButtonPadrao
                            title='Concluir Frete'
                            typeButton='aceite'
                            classname='px-5'
                            onPress={handleConcluirFrete}
                        />
                    )}
                </View>

            </ScrollView>
        </View>
    );
};

export default memo(DetailsEnvio);