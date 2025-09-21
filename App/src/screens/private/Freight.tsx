import React, { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { TouchableOpacity, FlatList, RefreshControl, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ApiFreight = { [key: string]: any };
interface FreightItem {
    id: string;
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
    prazo?: number;
    distancia?: number;
    [key: string]: any;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Freight'>;

import useFreight from '@/src/hooks/hookFreight/useFreight';
import { calculateFreightDistance, useGeoLocation } from '@/src/hooks/geolocalizacao/geoLocalizacao';

import CardCargo from '@/src/components/cards/CardCargo';

const STYLES = {
    containerBase: 'flex-1 bg-white',
    headerWrapper: 'pb-2.5',
    headerTitle: 'text-2xl font-extrabold text-center',
    searchWrapper: 'px-5 pb-3',
    searchInput: 'bg-gray-100 rounded-lg p-3 text-base border border-gray-200',
    locationBar: 'px-5 pb-4 flex-row items-center justify-end',
    smallBtn: 'px-3 py-2 rounded-md bg-blue-600',
    smallBtnTxt: 'text-white font-medium text-xs',
    toggleBtn: 'px-3 py-2 rounded-md bg-gray-200 ml-2',
    toggleBtnTxt: 'text-gray-800 font-medium text-xs',
    distanceBadge: 'absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md',
    distanceBadgeTxt: 'text-white text-[11px] font-semibold',
    emptyWrapper: 'flex-1 justify-center items-center p-5',
    emptyText: 'text-gray-500 text-base text-center',
    itemSeparator: 'h-5',
    loadingContainer: 'flex-1 justify-center items-center',
    loadingText: 'mt-2 text-gray-600',
};
const RADIUS_OPTIONS: (number | null)[] = [null, 50, 100, 200];
const COMPLETED_STATUS_ID = 5;

/**
 * Transforma os dados brutos da API em um formato limpo para o componente.
 * Esta é a etapa de "Tradução" ou "Adaptação" de dados.
 */
const mapApiToViewModel = (f: ApiFreight): FreightItem => ({
    id: String(f.id_frete),
    saida: f.saida,
    destino: f.destino,
    nome: f.carga?.nome,
    prazo: Number(f.prazo),
    peso: String(f.carga?.peso),
    tipo: f.carga?.tipoCarga?.nome,
    valor: String(f.carga?.valor_carga),
    logoEmpresa: f.empresa?.imagemEmpresa?.imgUrl,
    imagemCarga: f.carga?.imagemCarga?.imgUrl,
    valorFrete: String(f.valor_frete),
    descricao: f.carga?.descricao,
    distanciaDestino: calculateFreightDistance(f.saida, f.destino),
    nomeEmpresa: f.empresa?.nome,
    tipoEmpresa: f.empresa?.tipo,
    avaliacao: f.empresa?.avaliacao,
    imagemEmpresa: f.empresa?.imagemEmpresa?.imgUrl,
});


const FreightHeader = memo(() => (
    <View className={STYLES.headerWrapper}>
        <Text className={STYLES.headerTitle}>Fretes Disponíveis</Text>
    </View>
));

const SearchBar = memo(({ query, onSearch }: { query: string; onSearch: (q: string) => void }) => (
    <View className={STYLES.searchWrapper}>
        <TextInput
            className={STYLES.searchInput}
            placeholder="Pesquisar por cidade, tipo ou nome..."
            value={query}
            onChangeText={onSearch}
            placeholderTextColor="#999"
            accessibilityLabel="Campo de busca de fretes"
            returnKeyType="search"
            clearButtonMode="while-editing"
        />
    </View>
));

interface FilterControlsProps {
    locLoading: boolean;
    sortNearest: boolean;
    radiusKm: number | null;
    onUpdateLocation: () => void;
    onToggleSort: () => void;
    onToggleRadius: () => void;
}
const FilterControls = memo(({ locLoading, sortNearest, radiusKm, onUpdateLocation, onToggleSort, onToggleRadius }: FilterControlsProps) => (
    <View className={STYLES.locationBar}>
        <Pressable onPress={onUpdateLocation} disabled={locLoading} className={STYLES.smallBtn}>
            <Text className={STYLES.smallBtnTxt}>{locLoading ? 'Localizando...' : 'Atualizar Local'}</Text>
        </Pressable>
        <Pressable onPress={onToggleSort} className={STYLES.toggleBtn}>
            <Text className={STYLES.toggleBtnTxt}>{sortNearest ? 'Mais Próximos' : 'Mais Recentes'}</Text>
        </Pressable>
        <Pressable onPress={onToggleRadius} className={STYLES.toggleBtn}>
            <Text className={STYLES.toggleBtnTxt}>Raio: {radiusKm == null ? 'Todos' : `${radiusKm}km`}</Text>
        </Pressable>
    </View>
));

const FreightListItem = memo(({ item, onNavigate }: { item: FreightItem; onNavigate: (item: FreightItem) => void }) => (
    <TouchableOpacity onPress={() => onNavigate(item)} accessibilityLabel={`Ver detalhes do frete ${item.nome}`}>
        <View>
            <CardCargo {...item} />
            {item.distancia != null && (
                <View className={STYLES.distanceBadge}>
                    <Text className={STYLES.distanceBadgeTxt}>Aprox. {item.distancia} km de você</Text>
                </View>
            )}
        </View>
    </TouchableOpacity>
));

const LoadingIndicator = () => (
    <View className={STYLES.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className={STYLES.loadingText}>Carregando fretes...</Text>
    </View>
);

interface ListEmptyStateProps {
    locError: string | null;
    hasSourceData: boolean;
    searchQuery: string;
}
const ListEmptyState = memo(({ locError, hasSourceData, searchQuery }: ListEmptyStateProps) => {
    const getMessage = () => {
        if (locError) return locError;
        if (!hasSourceData) return 'Nenhum frete disponível no momento.';
        if (searchQuery) return `Nenhum frete encontrado para "${searchQuery}".`;
        return 'Nenhum frete corresponde aos filtros aplicados.';
    };

    return (
        <View className={STYLES.emptyWrapper}>
            <Text className={STYLES.emptyText}>{getMessage()}</Text>
        </View>
    );
});


const Freight = () => {

    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();
    const { freightData, getFreightDado, isLoading } = useFreight();


    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortNearest, setSortNearest] = useState(true);
    const [radiusIndex, setRadiusIndex] = useState(0);


    const radiusKm = RADIUS_OPTIONS[radiusIndex];

    const baseData = useMemo<FreightItem[]>(() => {
        if (!Array.isArray(freightData)) return [];
        return freightData
            .filter(f => f.status?.id_status !== COMPLETED_STATUS_ID)
            .map(mapApiToViewModel);
    }, [freightData]);

    const filteredData = useMemo<FreightItem[]>(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return baseData;
        return baseData.filter(item =>
            item.nome?.toLowerCase().includes(query) ||
            item.tipo?.toLowerCase().includes(query) ||
            item.saida?.toLowerCase().includes(query) ||
            item.destino?.toLowerCase().includes(query)
        );
    }, [searchQuery, baseData]);

    const { processedData, locLoading, locError, requestLocation } = useGeoLocation(filteredData, sortNearest, radiusKm);


    const handleToggleSort = useCallback(() => setSortNearest(s => !s), []);
    const handleSearch = useCallback((query: string) => setSearchQuery(query), []);
    const handleRadiusToggle = useCallback(() => {
        setRadiusIndex(currentIndex => (currentIndex + 1) % RADIUS_OPTIONS.length);
    }, []);
    const handleNavigateDetails = useCallback((item: FreightItem) => {
        navigation.navigate('DetailsFreight', { freight: item });
    }, [navigation]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await Promise.all([getFreightDado(), requestLocation()]);
        setRefreshing(false);
    }, [getFreightDado, requestLocation]);

    useEffect(() => {
        getFreightDado();
        requestLocation();
    }, [getFreightDado, requestLocation]);

    const renderItem = useCallback(({ item }: { item: FreightItem }) => (
        <FreightListItem item={item} onNavigate={handleNavigateDetails} />
    ), [handleNavigateDetails]);

    const isInitialLoading = isLoading && !refreshing && baseData.length === 0;

    return (
        <View className={STYLES.containerBase} style={{ paddingTop: insets.top }}>
            <FreightHeader />
            <SearchBar query={searchQuery} onSearch={handleSearch} />
            <FilterControls
                locLoading={locLoading}
                sortNearest={sortNearest}
                radiusKm={radiusKm}
                onUpdateLocation={requestLocation}
                onToggleSort={handleToggleSort}
                onToggleRadius={handleRadiusToggle}
            />
            {isInitialLoading ? (
                <LoadingIndicator />
            ) : (
                <FlatList
                    data={processedData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View className={STYLES.itemSeparator} />}
                    contentContainerStyle={{ paddingBottom: insets.bottom + 20, paddingHorizontal: 10, flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#2563eb"]} tintColor={"#2563eb"} />}
                    ListEmptyComponent={<ListEmptyState locError={locError} hasSourceData={baseData.length > 0} searchQuery={searchQuery} />}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
};

export default memo(Freight);