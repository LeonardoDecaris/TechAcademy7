import CardCargo from "@/src/components/cards/CardCargo";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from "react";
import { TouchableOpacity, FlatList, RefreshControl, Text, View, TextInput } from "react-native"; // removido StyleSheet
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MOCK_DATA } from "@/src/data/fretes";

interface CardCargaProps {
	nome?: string;
	tipo?: string;
	peso?: string;
	saida?: string;
	destino?: string;
	logoEmpresa?: string;
	imagemCarga?: string;
	valor?: string;
}

type FreightItem = CardCargaProps & { id: string; };

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Freight'>;

function Freight() {
	const [refreshing, setRefreshing] = useState(false);
	const [filtered, setFiltered] = useState<FreightItem[]>(MOCK_DATA);
	const [searchQuery, setSearchQuery] = useState<string>(''); // State for search input

	const navigation = useNavigation<NavigationProp>();
	const insets = useSafeAreaInsets();

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		setFiltered(MOCK_DATA);
		setSearchQuery('');
		setRefreshing(false);
	}, []);

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.trim() === '') {
			setFiltered(MOCK_DATA);
		} else {
			const filteredData = MOCK_DATA.filter(item =>
				item.nome?.toLowerCase().includes(query.toLowerCase()) ||
				item.tipo?.toLowerCase().includes(query.toLowerCase()) ||
				item.saida?.toLowerCase().includes(query.toLowerCase()) ||
				item.destino?.toLowerCase().includes(query.toLowerCase())
			);
			setFiltered(filteredData);
		}
	};

	const renderItem = ({ item }: { item: FreightItem }) => (
		<TouchableOpacity onPress={() => navigation.navigate('DetailsFreight', { freight: item })}>
			<CardCargo
				nome={item.nome}
				tipo={item.tipo}
				peso={item.peso}
				saida={item.saida}
				destino={item.destino}
				logoEmpresa={item.logoEmpresa}
				imagemCarga={item.imagemCarga}
				valor={item.valor}
			/>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 bg-white" style={{ paddingTop: insets.top + 10 }}>
			<View className="pb-2.5">
				<Text className="text-2xl font-extrabold text-center">Fretes Disponíveis</Text>
			</View>

			<View className="px-5 pb-5">
				<TextInput
					className="bg-gray-100 rounded-lg p-3 text-base border border-gray-200"
					placeholder="Pesquise sua Carga"
					value={searchQuery}
					onChangeText={handleSearch}
					placeholderTextColor="#999"
				/>
			</View>

			<FlatList
				data={filtered}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <View className="h-5" />}
				contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 20 }}
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				ListEmptyComponent={
					<View className="items-center mt-16">
						<Text className="text-gray-500 text-base">Nenhum frete encontrado</Text>
					</View>
				}
			/>
		</View>
	);
}

export default Freight;