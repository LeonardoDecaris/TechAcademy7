import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, RefreshControl, View, Text, Alert } from 'react-native';

import { BASE_URL } from '@env';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import TopoMyVehicle from '@/src/components/base/TopoMyVehicle';
import useGetUserData from '@/src/hooks/hookUser/useGetUserData';
import InformationBox from '@/src/components/form/InformarionBox';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';

const driverLabelStyle = 'text-sm font-semibold text-black/60';
const driverCardStyle = 'w-full bg-white rounded-xl p-2.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]';
const actionBarStyle = 'flex-1 flex-row justify-between gap-4 items-end pt-5';

const MyVehicle = () => {

	const { userData, getUserData } = useGetUserData();
	const [refreshing, setRefreshing] = useState(false);
	const { getVehicleData, veiculo } = useGetVehicleData();

	const imagemUrl = useMemo(() => (
		veiculo?.veiculo?.imagemVeiculo?.imgUrl ? `${BASE_URL}${veiculo.veiculo.imagemVeiculo.imgUrl}` : ''
	), [veiculo]);

	const capacidadeFormatada = useMemo(() => {
		const c = veiculo?.veiculo?.capacidade;
		if (c === undefined || c === null || c === '') return 'Não informado';
		return `${c} toneladas`;
	}, [veiculo]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		try {
			await Promise.all([getUserData(), getVehicleData()]);
		} finally {
			setRefreshing(false);
		}
	}, [getUserData, getVehicleData]);

	useEffect(() => {
		(async () => {
			await Promise.all([getUserData(), getVehicleData()]);
		})();
	}, [getUserData, getVehicleData]);


	return (
		<View style={{ flex: 1, paddingTop: 10 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 10, paddingBottom: 20 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				showsVerticalScrollIndicator={false}
			>
				<TopoMyVehicle
					imagem={imagemUrl}
					ano={veiculo?.veiculo?.ano || 'Não informado'}
					placa={veiculo?.veiculo?.placa || 'Não informado'}
					marca={veiculo?.veiculo?.marca || 'Não informado'}
					modelo={veiculo?.veiculo?.modelo || 'Não informado'}
					quilometragem={veiculo?.veiculo?.quilometragem || 'Não informado'}
				/>

				<View className='pb-4'>
					<InformationBox title='Capacidade' descricao={capacidadeFormatada} />
				</View>

				<View className={driverCardStyle}>
					<Text className='text-base font-bold'>Motorista</Text>
					<Text className={driverLabelStyle}>Motorista: {userData?.nome || 'Não informado'}</Text>
					<Text className={driverLabelStyle}>Email: {userData?.email || 'Não informado'}</Text>
					<Text className={driverLabelStyle}>Categoria: {userData?.cnh || 'Não informado'}</Text>
				</View>

				<View className={actionBarStyle}>
					<ButtonPadrao
						title='Excluir'
						classname='w-[48%]'
						typeButton='logOutExcluir'
						onPress={() => { Alert.alert('Excluir veículo em desenvolvimento'); }}
					/>
					<ButtonPadrao
						title='Editar'
						classname='w-[48%]'
						typeButton='normal'
						onPress={() => { Alert.alert('Editar veículo em desenvolvimento'); }}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default memo(MyVehicle);