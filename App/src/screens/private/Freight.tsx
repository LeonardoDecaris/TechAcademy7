import React, { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { TouchableOpacity, FlatList, RefreshControl, Text, View, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CardCargo from '@/src/components/cards/CardCargo';
import { RootStackParamList } from '@/src/navigation/Routes';
import { obterLocalizacao } from '@/src/utils/minhaLocalizacao';
import { haversineKm } from '@/src/utils/distance';
import { ORIGENS_PARANA } from '@/src/data/fretesCoordsParana';
import useFreight from '@/src/hooks/useFreight';

interface Coord {
	latitude: number;
	longitude: number;
}

interface CardCargaProps {
	nome?: string;
	tipo?: string;
	peso?: string;
	saida?: string;
	destino?: string;
	logoEmpresa?: string;
	imagemCarga?: string;
	valor?: string;
	valorFrete?: string;
	descricao?: string;
}

type FreightItem = CardCargaProps & { id: string; };

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Freight'>;

const headerWrapperStyle = 'pb-2.5';
const searchWrapperStyle = 'px-5 pb-3';
const containerBaseStyle = 'flex-1 bg-white';
const emptyWrapperStyle = 'items-center mt-16';
const emptyTextStyle = 'text-gray-500 text-base';
const smallBtnStyle = 'px-3 py-2 rounded-md bg-blue-600';
const smallBtnTxtStyle = 'text-white font-medium text-xs';
const toggleBtnTxtStyle = 'text-gray-800 font-medium text-xs';
const headerTitleStyle = 'text-2xl font-extrabold text-center';
const toggleBtnStyle = 'px-3 py-2 rounded-md bg-gray-200 ml-2';
const distanceBadgeTxtStyle = 'text-white text-[11px] font-semibold';
const locationBarStyle = 'px-5 pb-4 flex-row items-center justify-end';
const distanceBadgeStyle = 'absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md';
const searchInputStyle = 'bg-gray-100 rounded-lg p-3 text-base border border-gray-200';

const Freight = () => {
	const { freightData, getFreightDado, isLoading } = useFreight();

	const [refreshing, setRefreshing] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [userCoord, setUserCoord] = useState<Coord | null>(null);
	const [locLoading, setLocLoading] = useState(false);
	const [locError, setLocError] = useState<string | null>(null);
	const [sortNearest, setSortNearest] = useState(true);
	const [radiusKm, setRadiusKm] = useState<number | null>(null);

	const navigation = useNavigation<NavigationProp>();
	const insets = useSafeAreaInsets();

	const requestLocation = useCallback(async () => {
		setLocError(null);
		setLocLoading(true);
		try {
			const loc = await obterLocalizacao({ highAccuracy: true });
			setUserCoord({ latitude: loc.latitude, longitude: loc.longitude });
		} catch (e: any) {
			setLocError(e?.message || 'Falha ao obter localização');
			setUserCoord(null);
		} finally {
			setLocLoading(false);
		}
	}, []);

	const dataBase = useMemo<FreightItem[]>(() => {
		if (!Array.isArray(freightData)) return [];
		return freightData.map(f => ({
			id: String(f.id_frete),
			nome: f.carga?.nome,
			tipo: f.carga?.nome || f.carga?.descricao,
			peso: f.carga?.peso,
			saida: f.saida,
			destino: f.destino,
			logoEmpresa: f.empresa?.imagemEmpresa?.imgUrl,
			imagemCarga: f.carga?.imagemCarga?.imgUrl,
			valorFrete: f.valor_frete,
			descricao: f.carga?.descricao
		}));
	}, [freightData]);

	const filtered = useMemo<FreightItem[]>(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return dataBase;
		return dataBase.filter(
			(item) =>
				item.nome?.toLowerCase().includes(q) ||
				item.tipo?.toLowerCase().includes(q) ||
				item.saida?.toLowerCase().includes(q) ||
				item.destino?.toLowerCase().includes(q)
		);
	}, [searchQuery, dataBase]);

	const normalizeName = (s?: string) =>
		(s || '')
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.toLowerCase()
			.trim();

	const originMap = useMemo(() => {
		const map = new Map<string, Coord>();
		ORIGENS_PARANA.forEach(o => {
			map.set(normalizeName(o.nome), o.saidaCoord);
		});
		return map;
	}, []);

	const withDistance = useMemo(() => {
		if (!userCoord) return filtered;

		return filtered
			.map((f: FreightItem) => {
				let coord: Coord | undefined;
				if (f.saida) coord = originMap.get(normalizeName(f.saida));

				let distanceKm: number | undefined;
				if (coord) {
					distanceKm = Number(haversineKm(userCoord, coord).toFixed(1));
				}

				return { ...f, distanceKm };
			})
			.filter(item => {
				if (radiusKm == null) return true;
				return item.distanceKm != null && item.distanceKm <= radiusKm;
			})
			.sort((a, b) => {
				if (!sortNearest) return 0;
				if (a.distanceKm == null) return 1;
				if (b.distanceKm == null) return -1;
				return a.distanceKm - b.distanceKm;
			});
	}, [filtered, userCoord, sortNearest, radiusKm, originMap]);

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setSearchQuery('');
		await requestLocation();
		setRefreshing(false);
	}, [requestLocation]);

	const handleNavigateDetails = useCallback(
		(item: FreightItem & { distanceKm?: number }) =>
			navigation.navigate('DetailsFreight', { freight: item }),
		[navigation]
	);

	const toggleSort = useCallback(() => {
		setSortNearest(s => !s);
	}, []);

	const handleRadiusToggle = useCallback(() => {
		setRadiusKm(r => {
			if (r === 50) return 100;
			if (r === 100) return 200;
			if (r == null) return 50;
			return null;
		});
	}, []);

	useEffect(() => {
		(async () => {
			await Promise.all([getFreightDado(), requestLocation()]);
		})();
	}, [getFreightDado, requestLocation]);

	const renderItem = useCallback(
		({ item }: { item: FreightItem & { distanceKm?: number } }) => (
			<TouchableOpacity
				onPress={() => handleNavigateDetails(item)}
				accessibilityLabel={`Ver detalhes do frete ${item.nome}. Distância até coleta ${item.distanceKm != null ? item.distanceKm + ' quilômetros' : 'não disponível'
					}`}
			>
				<View className="relative">
					<CardCargo
						nome={item.nome}
						tipo={item.tipo}
						peso={item.peso}
						saida={item.saida}
						destino={item.destino}
						logoEmpresa={item.logoEmpresa}
						imagemCarga={item.imagemCarga}
						valorFrete={item.valorFrete}
						descricao={item.descricao}
					/>
					{item.distanceKm != null && (
						<View className={distanceBadgeStyle} accessibilityLabel={`Distância até a saída: ${item.distanceKm} km`}>
							<Text className={distanceBadgeTxtStyle}>{item.distanceKm} km</Text>
						</View>
					)}
				</View>
			</TouchableOpacity>
		),
		[handleNavigateDetails]
	);

	return (
		<View className={containerBaseStyle} style={{ paddingTop: insets.top + 10 }}>
			<View className={headerWrapperStyle}>
				<Text className={headerTitleStyle}>Fretes Disponíveis</Text>
			</View>

			<View className={searchWrapperStyle}>
				<TextInput
					className={searchInputStyle}
					placeholder="Pesquise sua Carga"
					value={searchQuery}
					onChangeText={handleSearch}
					placeholderTextColor="#999"
					accessibilityLabel="Campo de busca de fretes"
					returnKeyType="search"
					clearButtonMode="while-editing"
				/>
			</View>

			<View className={locationBarStyle}>
				<Pressable onPress={requestLocation} disabled={locLoading} className={smallBtnStyle}>
					<Text className={smallBtnTxtStyle}>{locLoading ? '...' : 'Atualizar'}</Text>
				</Pressable>
				<Pressable onPress={toggleSort} className={toggleBtnStyle}>
					<Text className={toggleBtnTxtStyle}>{sortNearest ? 'Ordem: Próx.' : 'Ordem: Original'}</Text>
				</Pressable>
				<Pressable onPress={handleRadiusToggle} className={toggleBtnStyle}>
					<Text className={toggleBtnTxtStyle}>
						Raio: {radiusKm == null ? 'Todos' : `${radiusKm}km`}
					</Text>
				</Pressable>
			</View>

			<FlatList
				data={withDistance as any}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <View className="h-5" />}
				contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 10 }}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				ListEmptyComponent={
					<View className={emptyWrapperStyle}>
						<Text className={emptyTextStyle}>
							{isLoading
								? 'Carregando fretes...'
								: dataBase.length === 0
									? 'Nenhum frete carregado'
									: 'Nenhum frete corresponde à busca'}
						</Text>
					</View>
				}
				keyboardShouldPersistTaps="handled"
			/>
		</View>
	);
};

export default memo(Freight);