import React, { useEffect, useCallback, useState, useMemo, memo } from 'react';
import { Image, ScrollView, RefreshControl, TouchableOpacity, View, Text } from 'react-native';

import { BASE_URL } from '@env';
import { useAuth } from '@/src/context/AuthContext';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import { formatDateTime } from '@/src/utils/funcoes';
import CardFreight from '@/src/components/cards/CardFreight';
import VehicleCard from '@/src/components/cards/VehicleCard';
import AcessoRapido from '@/src/components/base/AcessoRapido';
import CardMyContract from '@/src/components/cards/CardMyContract';
import useGetFreightConfirm from '@/src/hooks/useGetFreightComfirm';
import ModalConfirmation from '@/src/components/modal/ModalConfirmation';
import AlertNotification from '@/src/components/modal/AlertNotification';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const greetingTextStyle = 'text-2xl font-bold';
const avatarTextStyle = 'text-[20px] font-bold text-white';
const headerLeftRowStyle = 'flex-row items-center gap-2.5';
const headerRowStyle = 'flex-row items-center justify-between pb-10';
const avatarWrapperStyle = 'h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center';

const Home = () => {

    const { logout } = useAuth();
    const navigation = useNavigation<NavigationProp>();

    const insets = useSafeAreaInsets();
    const containerStyle = useMemo(() => ({ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top + 10 }), [insets.top]);

    const { getVehicleData, veiculo } = useGetVehicleData();
    const { userData, getUserData, iniciasNomeUsuario, nomeAbreviado } = useGetUserData();
    const { getDados: getDadosFrete, closeSuccessNotification, mensage, success, successVisible, dadosFrete } = useGetFreightConfirm(veiculo?.id_caminhoneiro || 0);

    const hasVehicle = Boolean(veiculo?.veiculo);
    const [refreshing, setRefreshing] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showNoVehicle, setShowNoVehicle] = useState(false);

    const imagemUrl = `${BASE_URL}${userData?.imagemUsuario?.imgUrl}`;
    const imagemVeiculo = `${BASE_URL}${veiculo?.veiculo?.imagemVeiculo?.imgUrl}`;
    const imagemEmpresa = `${BASE_URL}${dadosFrete?.empresa?.imagemEmpresa?.imgUrl}`;

    const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);
    const goMyVehicle = useCallback(() => { hasVehicle ? navigation.navigate('MyVehicle') : setShowNoVehicle(true); }, [hasVehicle, navigation]);

    const handleConfirmCreateVehicle = useCallback(() => { setShowNoVehicle(false); navigation.navigate('RegisterVehicle'); }, [navigation]);
    const handleLogout = useCallback(async () => { await logout(); navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] }); }, [logout, navigation]);

    const onRefresh = useCallback(async ( caminhoneiroId?: number ) => {
        setRefreshing(true);
        try {
            await Promise.all([getUserData(), getVehicleData()]);
        if (caminhoneiroId) { await getDadosFrete(); }
        } finally { setRefreshing(false); }
    }, [getUserData, getVehicleData, getDadosFrete, veiculo?.id_caminhoneiro]);

    useEffect(() => {
        getUserData();
        getVehicleData();
        if (veiculo?.id_caminhoneiro) { getDadosFrete(); }
    }, [getUserData, getVehicleData, getDadosFrete, veiculo?.id_caminhoneiro]);

    const detailsEnvioParams = useMemo(() => ({
        dadosFrete: {
            ...dadosFrete,
            data_saida: dadosFrete?.data_saida ? typeof dadosFrete.data_saida === 'string' ? dadosFrete.data_saida : dadosFrete.data_saida?.toISOString?.() ?? '' : undefined,
            data_chegada: dadosFrete?.data_chegada ? typeof dadosFrete.data_chegada === 'string' ? dadosFrete.data_chegada : dadosFrete.data_chegada?.toISOString?.() ?? '' : undefined,
        },
        userData: userData ? {
            ...userData,
            imagemUsuario: userData.imagemUsuario ? { imgUrl: userData.imagemUsuario.imgUrl } : undefined,
        } : undefined,
        veiculo: veiculo?.veiculo,
    }), [dadosFrete, userData, veiculo?.veiculo]);

    return (
        <View style={containerStyle}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }} 
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
                showsVerticalScrollIndicator={false}
            >
                <View className={headerRowStyle}>   
                    <View className={headerLeftRowStyle}>
                        <TouchableOpacity
                            onPress={goProfile}
                            className={avatarWrapperStyle}
                            accessibilityLabel="Ir para perfil"
                        >
                            {imagemUrl ? (
                                <Image
                                    source={{ uri: imagemUrl }}
                                    className="w-[50px] h-[50px] rounded-full bg-gray-200"
                                />
                            ) : (
                                <Text className={avatarTextStyle}>
                                    {iniciasNomeUsuario}
                                </Text>
                            )}
                        </TouchableOpacity>
                        <Text className={greetingTextStyle}>
                            Olá, {nomeAbreviado ?? 'Usuário'}!
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowLogout(true)}
                        accessibilityLabel="Abrir modal de logout"
                    >
                        <Ionicons name="log-out-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <CardMyContract
                    motorista={userData?.nome || 'Motorista'}
                    nome={dadosFrete?.carga?.nome || 'nenhum'}
                    tipo={dadosFrete?.carga?.tipoCarga?.nome || "nenhum"}
                    peso={dadosFrete?.carga?.peso || '0'}
                    saida={dadosFrete?.saida || 'sem local'}
                    destino={dadosFrete?.destino || 'sem destino'}
                    logoEmpresa={imagemEmpresa || ''}
                    imagemCarga=""
                    valorFrete={dadosFrete?.valor_frete || '0'}
                    saidaHora={formatDateTime(dadosFrete?.data_saida) || 'sem horario'}
                    onPress={() => navigation.navigate('DetailsEnvio', detailsEnvioParams)}
                />

                <AcessoRapido
                    onPress={() => navigation.navigate('DetailsEnvio', detailsEnvioParams)}
                    title="Detalhes do envio"
                />

                <CardFreight
                    tipo={dadosFrete?.carga?.tipoCarga?.nome || 'nenhum'}
                    peso={dadosFrete?.carga?.peso || '0'}
                    destino={dadosFrete?.destino || 'sem destino'}
                    progresso={dadosFrete?.status?.id_status || 0}
                    TypeButton={true}
                    onPress={() => navigation.navigate('DetailsEnvio', detailsEnvioParams)}
                />

                <AcessoRapido
                    onPress={goMyVehicle}
                    title="Meu Veículo"
                />

                <VehicleCard
                    onPress={goMyVehicle}
                    TypeButton={hasVehicle}
                    codigo={veiculo?.veiculo_id}
                    modelo={veiculo?.veiculo?.modelo}
                    marca={veiculo?.veiculo?.marca}
                    ano={veiculo?.veiculo?.ano}
                    placa={veiculo?.veiculo?.placa}
                    imagem={imagemVeiculo}
                />
            </ScrollView>

            <ModalConfirmation
                mode="logout"
                visible={showLogout}
                onConfirm={handleLogout}
                onCancel={() => setShowLogout(false)}
            />

            <AlertNotification
                visible={successVisible}
                status={success as 'success' | 'error' | 'loading'}
                messagem={mensage}
                onDismiss={closeSuccessNotification}
            />

            <ModalConfirmation
                mode="no_vehicle"
                visible={showNoVehicle}
                onConfirm={handleConfirmCreateVehicle}
                onCancel={() => setShowNoVehicle(false)}
            />
        </View>
    );
};

export default memo(Home);