import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopoDetailsCargo from '@/src/components/base/TopoDetailsCargo';
import CardInfoCompany from '@/src/components/cards/CardInfoCompany';
import CardDeliveryTime from '@/src/components/cards/CardDeliveryTime';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import useConfirmFreight from '@/src/hooks/hookFreight/useConfirmFreight';
import AlertNotification from '@/src/components/modal/AlertNotification';
import ModalConfirmation from '@/src/components/modal/ModalConfirmation';
import useGetFreightConfirm from '@/src/hooks/hookFreight/useGetFreightComfirm';

type DetailsRouteProp = RouteProp<RootStackParamList, 'DetailsFreight'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const containerPaddingTop = 20;
const cardsRowStyle = 'flex-row gap-4 pb-6';
const descriptionTextStyle = 'font-medium text-sm';
const actionRowStyle = 'w-full flex-row justify-end px-2.5 pt-5';
const sectionTitleStyle = 'text-xl font-extrabold pl-2.5 pb-2.5';
const scrollContentStyle = { paddingHorizontal: 10, paddingBottom: 50 };
const descriptionTitleStyle = 'text-xl font-bold pl-2.5 pb-2.5 text-[#322F2F]';

const DetailsFreight = () => {
	const navigation = useNavigation<NavigationProp>();
	const { params: { freight } } = useRoute<DetailsRouteProp>();

	const [refreshing, setRefreshing] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const { getVehicleData, veiculo } = useGetVehicleData();
	const { getDados, dadosFrete } = useGetFreightConfirm(veiculo?.id_caminhoneiro || 0);
	const { confirmFreight, mensage, success, successVisible, closeSuccessNotification } = useConfirmFreight();

	const handleConfirmModal = useCallback(() => { setIsModalVisible(false); navigation.navigate('RegisterVehicle'); }, [navigation]);
	const handleCancelModal = useCallback(() => { setIsModalVisible(false); }, []);

	const refreshData = useCallback(async (caminhoneiroId?: number) => {
		await Promise.all([getVehicleData(),]);
		if (caminhoneiroId) { await getDados(); }
	}, [getVehicleData, getDados]);

	useEffect(() => {
		getVehicleData();
	}, []);

	useEffect(() => {
		if (veiculo?.id_caminhoneiro) {
			getDados();
		}
	}, [veiculo?.id_caminhoneiro]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		try {
			await refreshData(veiculo?.id_caminhoneiro);
		} finally {
			setRefreshing(false);
		}
	}, [refreshData, veiculo?.id_caminhoneiro]);

	const handleAcceptFreight = useCallback(() => {
		if (veiculo?.id_caminhoneiro) {
			confirmFreight(freight.id, veiculo.id_caminhoneiro);
		} else {
			setIsModalVisible(true);
		}
	}, [veiculo?.id_caminhoneiro, confirmFreight, freight.id]);


	return (
		<View style={{ flex: 1, paddingTop: containerPaddingTop }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={scrollContentStyle}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<ModalConfirmation
					visible={isModalVisible}
					mode="no_vehicle"
					onConfirm={handleConfirmModal}
					onCancel={handleCancelModal}
				/>

				<AlertNotification
					visible={successVisible}
					status={success as "success" | "error" | "loading"}
					messagem={mensage}
					onDismiss={closeSuccessNotification}
				/>

				<TopoDetailsCargo
					nome={freight.nome}
					tipo={freight.tipo}
					peso={freight.peso}
					saida={freight.saida}
					destino={freight.destino}
					valor={freight.valor}
					valorFrete={freight.valorFrete}
					descricao={freight.descricao}
					imagem={freight.imagemCarga}
				/>

				<Text className={sectionTitleStyle}>Detalhes</Text>

				<View className={cardsRowStyle}>
					<CardInfoCompany
						nomeEmpresa={freight.nomeEmpresa || "Empresa não informada"}
						tipo={freight.tipoEmpresa || "Tipo não informado"}
						avaliacao={freight.avaliacao || 0}
						imagem={freight.imagemEmpresa || undefined}
					/>
					<CardDeliveryTime
						destino={freight.destino}
						distancia={freight.distanciaDestino}
						prazo={freight.prazo}
					/>
				</View>

				<Text className={descriptionTitleStyle}>Descrição do frete</Text>
				<Text className={descriptionTextStyle}>{freight.descricao}</Text>
				<View className='flex-1 justify-end '>
					{dadosFrete ? (
						<Text className='w-full bg-red-100 text-red-800 text-center font-semibold py-2.5 mt-5 rounded-lg'>
							Voce tem um frete em andamento
						</Text>
					) : null}
					<View className={actionRowStyle}>
						<ButtonPadrao
							title='Aceitar'
							typeButton='aceite'
							classname='px-5'
							onPress={handleAcceptFreight}
							disabled={dadosFrete ? true : false}
							accessibilityLabel='Aceitar este frete'
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default memo(DetailsFreight);