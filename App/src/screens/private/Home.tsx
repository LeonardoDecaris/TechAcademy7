import React, { useEffect, useCallback, useState, useMemo, memo } from 'react';
import { Image, ScrollView, RefreshControl, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// --- Configuração e Tipos ---
import { BASE_URL } from '@env';
import { RootStackParamList } from '@/src/navigation/Routes';
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// --- Contexto e Hooks ---
import { useAuth } from '@/src/context/AuthContext';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import useGetFreightConfirm from '@/src/hooks/hookFreight/useGetFreightComfirm';

// --- Componentes ---
import AcessoRapido from '@/src/components/base/AcessoRapido';
import CardFreight from '@/src/components/cards/CardFreight';
import VehicleCard from '@/src/components/cards/VehicleCard';
import CardMyContract from '@/src/components/cards/CardMyContract';
import ModalConfirmation from '@/src/components/modal/ModalConfirmation';
import AlertNotification from '@/src/components/modal/AlertNotification';


import { formatDateTime } from '@/src/utils/funcoes';

const STYLES = {
    greetingText: 'text-2xl font-semibold',
    avatarText: 'text-[20px] font-bold text-white',
    headerLeftRow: 'flex-row items-center gap-2.5',
    headerRow: 'flex-row items-center justify-between pb-10',
    avatarWrapper: 'h-[50px] w-[50px] rounded-full bg-gray-300 items-center justify-center',
    avatarImage: 'w-full h-full rounded-full',
};

const Home = () => {

    const { logout } = useAuth();
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();

    const { userData, getUserData, iniciasNomeUsuario, nomeAbreviado } = useGetUserData();
    const { getVehicleData, veiculo } = useGetVehicleData();
    const caminhoneiroId = veiculo?.id_caminhoneiro;
    const {
        getDados: getDadosFrete,
        closeSuccessNotification,
        mensage,
        success,
        successVisible,
        dadosFrete
    } = useGetFreightConfirm(caminhoneiroId || 0);

    const [refreshing, setRefreshing] = useState(false);
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [isNoVehicleModalVisible, setNoVehicleModalVisible] = useState(false);
    const [noFreteModalVisible, setNoFreteModalVisible] = useState(false);

    const containerStyle = useMemo(() => ({
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: insets.top + 20,
    }), [insets.top]);

    const hasVehicle = Boolean(veiculo?.veiculo);
    const hasFrete = Boolean(dadosFrete?.id_frete);
    const userImageUrl = userData?.imagemUsuario?.imgUrl ? `${BASE_URL}${userData.imagemUsuario.imgUrl}` : '';
    const vehicleImageUrl = veiculo?.veiculo?.imagemVeiculo?.imgUrl ? `${BASE_URL}${veiculo.veiculo.imagemVeiculo.imgUrl}` : '';

    const fetchInitialData = useCallback(async () => {
        await Promise.all([
            getUserData(),
            getVehicleData(),
        ]);
        if (caminhoneiroId) {
            await getDadosFrete();
        }
    }, [getUserData, getVehicleData, getDadosFrete, caminhoneiroId]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchInitialData();
        } catch (error) {
            console.error("Failed to refresh data:", error);
        } finally {
            setRefreshing(false);
        }
    }, [fetchInitialData]);

    const closeAlertNotFreight = useCallback(() => {
        setNoFreteModalVisible(false);
    }, []);

    const handleNavigateToProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);
    const handleNavigateToMyVehicle = useCallback(() => {
        if (hasVehicle) {
            navigation.navigate('MyVehicle');
        } else {
            setNoVehicleModalVisible(true);
        }
    }, [hasVehicle, navigation]);
    const handleNavigateToDetailsEnvio = useCallback(() => {
        if (hasFrete) {
            navigation.navigate('DetailsEnvio');
        } else {
            setNoFreteModalVisible(true);
        }
    }, [hasFrete, navigation]);

    const handleConfirmCreateVehicle = useCallback(() => {
        setNoVehicleModalVisible(false);
        navigation.navigate('RegisterVehicle');
    }, [navigation]);

    const handleLogout = useCallback(async () => {
        await logout();
        navigation.reset({ index: 0, routes: [{ name: 'Login' as never }] });
    }, [logout, navigation]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    return (
        <View style={containerStyle}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >

                <View className={STYLES.headerRow}>
                    <View className={STYLES.headerLeftRow}>
                        <TouchableOpacity
                            onPress={handleNavigateToProfile}
                            className={STYLES.avatarWrapper}
                            accessibilityLabel="Ir para perfil"
                        >
                            {userImageUrl ? (
                                <Image source={{ uri: userImageUrl }} className={STYLES.avatarImage} />
                            ) : (
                                <Text className={STYLES.avatarText}>{iniciasNomeUsuario}</Text>
                            )}
                        </TouchableOpacity>
                        <Text className={STYLES.greetingText}>
                            Olá, {nomeAbreviado ?? 'Usuário'}!
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setLogoutModalVisible(true)} accessibilityLabel="Sair da conta">
                        <Ionicons name="log-out-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <CardMyContract
                    motorista={userData?.nome || 'Motorista'}
                    nome={dadosFrete?.carga?.nome || 'Nenhum'}
                    tipo={dadosFrete?.carga?.tipoCarga?.nome || "Nenhum"}
                    peso={dadosFrete?.carga?.peso || '0'}
                    saida={dadosFrete?.saida || 'Sem local'}
                    destino={dadosFrete?.destino || 'Sem destino'}
                    logoEmpresa={dadosFrete?.empresa?.imagemEmpresa?.imgUrl}
                    imagemCarga=""
                    valorFrete={dadosFrete?.valor_frete || '0'}
                    saidaHora={formatDateTime(dadosFrete?.data_saida) || 'Sem horário'}
                    onPress={handleNavigateToDetailsEnvio}
                />
                <AcessoRapido
                    onPress={handleNavigateToDetailsEnvio}
                    title="Detalhes do envio"
                />
                <CardFreight
                    tipo={dadosFrete?.carga?.tipoCarga?.nome || 'Nenhum'}
                    peso={dadosFrete?.carga?.peso || '0'}
                    destino={dadosFrete?.destino || 'Sem destino'}
                    progresso={dadosFrete?.status?.id_status || 0}
                    TypeButton={true}
                    onPress={handleNavigateToDetailsEnvio}
                />

                <AcessoRapido
                    onPress={handleNavigateToMyVehicle}
                    title="Meu Veículo"
                />
                <VehicleCard
                    onPress={handleNavigateToMyVehicle}
                    TypeButton={hasVehicle}
                    codigo={veiculo?.veiculo_id}
                    modelo={veiculo?.veiculo?.modelo}
                    marca={veiculo?.veiculo?.marca}
                    ano={veiculo?.veiculo?.ano}
                    placa={veiculo?.veiculo?.placa}
                    imagem={vehicleImageUrl}
                />
            </ScrollView>

            <ModalConfirmation
                mode="logout"
                visible={isLogoutModalVisible}
                onConfirm={handleLogout}
                onCancel={() => setLogoutModalVisible(false)}
            />
            <ModalConfirmation
                mode="no_vehicle"
                visible={isNoVehicleModalVisible}
                onConfirm={handleConfirmCreateVehicle}
                onCancel={() => setNoVehicleModalVisible(false)}
            />
            <AlertNotification
                visible={successVisible}
                status={success as 'success' | 'error' | 'loading'}
                messagem={mensage}
                onDismiss={closeSuccessNotification}
                topOffset={30}
            />
            <AlertNotification
                status='alert'
                visible={noFreteModalVisible}
                messagem="É preciso Ter um Frete Ativo"
                onDismiss={closeAlertNotFreight}
                topOffset={30}
            />
        </View>
    );
};

export default memo(Home);