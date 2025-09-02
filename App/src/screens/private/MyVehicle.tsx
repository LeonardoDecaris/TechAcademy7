import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, RefreshControl, View, Text } from 'react-native'

import TopoMyVehicle from '@/src/components/base/TopoMyVehicle';

function MyVehicle() {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setRefreshing(false);
	}, []);

	const InformartionStyle = "w-full flex-row items-center border border-black rounded-lg p-1.5"

	return (
		<SafeAreaView style={{ flex: 1,  backgroundColor: '#FFFFFF' }}>
			<ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: 10, paddingBottom: 130 }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false} >
				
				<TopoMyVehicle
					modelo="Fusca"
					marca="Volkswagen"
					quilometragem={12.499}
					ano={1970}
					placa="ABC-1234"
				/>

				<View className='w-full flex-col gap-2.5 pt-5'>
					<View className={InformartionStyle}>
						<Text className="font-semibold text-[14px]">Destino final:</Text>
						<Text className="font-medium text-[14px]">São Paulo</Text>
					</View>
					<View className={InformartionStyle}>
						<Text className="font-semibold text-[14px]">Destino final:</Text>
						<Text className="font-medium text-[14px]">São Paulo</Text>
					</View>
					<View className={InformartionStyle}>
						<Text className="font-semibold text-[14px]">Destino final:</Text>
						<Text className="font-medium text-[14px]">São Paulo</Text>
					</View>
					<View className={InformartionStyle}>
						<Text className="font-semibold text-[14px]">Destino final:</Text>
						<Text className="font-medium text-[14px]">São Paulo</Text>
					</View>
					<View className={InformartionStyle}>
						<Text className="font-semibold text-[14px]">Destino final:</Text>
						<Text className="font-medium text-[14px]">São Paulo</Text>
					</View>
					<View className={InformartionStyle}>
						<Text className="font-semibold text-[14px]">Destino final:</Text>
						<Text className="font-medium text-[14px]">São Paulo</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
export default MyVehicle;