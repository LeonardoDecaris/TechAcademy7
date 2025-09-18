import { useCallback, useEffect, useState, useMemo, memo } from 'react';
import { RefreshControl, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { formatDateTime } from '@/src/utils/funcoes';
import useIniciarRota from '@/src/hooks/useIniciarRota';
import CardCargo from '@/src/components/cards/CardCargo';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import CardFreight from '@/src/components/cards/CardFreight';
import useConcluirFreight from '@/src/hooks/useConcluirFreigth';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import InformationBox from '@/src/components/form/InformarionBox';
import useGetFreightConfirm from '@/src/hooks/useGetFreightComfirm';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import AlertNotification from '@/src/components/modal/AlertNotification';


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const containerBG = '#FFFFFF';
const avatarFallbackTextStyle = 'text-lg font-bold';
const cargoInfoWrapperStyle = 'py-5 flex-col gap-2.5';
const headerRowStyle = 'flex-row items-center gap-2.5 pb-5';
const cargoInfoTitleStyle = 'text-black font-semibold pl-2.5';
const actionRowStyle = 'w-full flex-row justify-end px-2.5 pt-5';

const DetailsEnvio = () => {

    const navigation = useNavigation<NavigationProp>();
    const [refreshing, setRefreshing] = useState(false);
    const goProfile = useCallback(() => navigation.navigate('MainTabs', { screen: 'Profile' }), [navigation]);

    const { getVehicleData, veiculo: data } = useGetVehicleData();
    const { userData, getUserData, nomeAbreviado, iniciasNomeUsuario } = useGetUserData();
    const { getDados: getDadosFrete, closeSuccessNotification, mensage, success, successVisible, dadosFrete } = useGetFreightConfirm(data?.id_caminhoneiro || 0);

    const imagemUrl = `${BASE_URL}${userData?.imagemUsuario?.imgUrl}`;

    const { iniciarRota, closeSuccessNotification: closeSuccessNotificationIniciarRota, mensage: mensageIniciarRota, success: successIniciarRota, successVisible: successVisibleIniciarRota } = useIniciarRota();
    const { concluirFrete, closeSuccessNotification: closeSuccessNotificationConcluirFrete, mensage: mensageConcluirFrete, success: successConcluirFrete, successVisible: successVisibleConcluirFrete } = useConcluirFreight();

    const handleIniciarRota = useCallback(() => { if (dadosFrete?.id_frete) { iniciarRota(dadosFrete.id_frete.toString()); } }, [iniciarRota, dadosFrete?.id_frete]);
    const handleConcluirFrete = useCallback(() => { if (dadosFrete?.id_frete) { concluirFrete(dadosFrete.id_frete.toString()); } }, [concluirFrete, dadosFrete?.id_frete]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await Promise.all([getUserData(), getVehicleData()]);
            if (data?.id_caminhoneiro) { await getDadosFrete(); }
        } finally {
            setRefreshing(false);
        }
    }, [getUserData, getVehicleData, getDadosFrete, data?.id_caminhoneiro]);

    useEffect(() => {
            (async () => {
                await Promise.all([getUserData(), getVehicleData(), getDadosFrete()]);
            })();
    }, [getUserData, getVehicleData, getDadosFrete]);


    return (
        <View style={{ flex: 1, backgroundColor: containerBG, paddingTop: 10 }}>
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
                    saida={dadosFrete?.saida || '--'}
                    destino={dadosFrete?.destino || '--'}
                    nome={dadosFrete?.carga?.nome || '--'}
                    peso={dadosFrete?.carga?.peso || '--'}
                    valorFrete={dadosFrete?.valor_frete || '--'}
                    tipo={dadosFrete?.carga?.tipoCarga?.nome || '--'}
                    imagemCarga={dadosFrete?.carga?.imagemCarga?.imgUrl || '--'}
                    logoEmpresa={dadosFrete?.empresa?.imagemEmpresa?.imgUrl || '--'}
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
                    <InformationBox title='Peso:' descricao={dadosFrete?.carga?.peso || '--'} />
                    <InformationBox title='Frete' descricao={dadosFrete?.valor_frete || '--'} />
                    <InformationBox title='Destino Final' descricao={dadosFrete?.destino || '--'} />
                    <InformationBox title='Cidade de Origem' descricao={dadosFrete?.saida || '--'} />
                    <InformationBox title='Incio' descricao={formatDateTime(dadosFrete?.data_saida)} />
                    <InformationBox title='Tipo' descricao={dadosFrete?.carga?.tipoCarga?.nome || '--'} />
                    <InformationBox title='Chegada' descricao={formatDateTime(dadosFrete?.data_chegada)} />
                    <InformationBox title='Valor da Carga' descricao={dadosFrete?.carga?.valor_carga || '--'} />
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