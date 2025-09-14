import React, { useCallback, useMemo, useState, memo, useEffect } from 'react';
import { TouchableOpacity, FlatList, RefreshControl, Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CardCargo from '@/src/components/cards/CardCargo';
import { RootStackParamList } from '@/src/navigation/Routes';
import useFreight from '@/src/hooks/useFreight';
import { calculateFreightDistance, useGeoLocation } from '@/src/hooks/geoLocalizacao';

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
    prazo?: number;
    distancia?: number;
}

type FreightItem = CardCargaProps & { id: string; };

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Freight'>;

const styles = {
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
    emptyWrapper: 'items-center mt-16',
    emptyText: 'text-gray-500 text-base',
    itemSeparator: 'h-5',
};

const FreightHeader = memo(() => (
    <View className={styles.headerWrapper}>
        <Text className={styles.headerTitle}>Fretes Disponíveis</Text>
    </View>
));

const SearchBar = memo(({ query, onSearch }: { query: string; onSearch: (q: string) => void }) => (
    <View className={styles.searchWrapper}>
        <TextInput
            className={styles.searchInput}
            placeholder="Pesquise sua Carga"
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
    <View className={styles.locationBar}>
        <Pressable onPress={onUpdateLocation} disabled={locLoading} className={styles.smallBtn}>
            <Text className={styles.smallBtnTxt}>{locLoading ? '...' : 'Atualizar'}</Text>
        </Pressable>
        <Pressable onPress={onToggleSort} className={styles.toggleBtn}>
            <Text className={styles.toggleBtnTxt}>{sortNearest ? 'Ordem: Próx.' : 'Ordem: Original'}</Text>
        </Pressable>
        <Pressable onPress={onToggleRadius} className={styles.toggleBtn}>
            <Text className={styles.toggleBtnTxt}>
                Raio: {radiusKm == null ? 'Todos' : `${radiusKm}km`}
            </Text>
        </Pressable>
    </View>
));

const FreightListItem = memo(({ item, onNavigate }: { item: FreightItem; onNavigate: (item: FreightItem) => void }) => (
    <TouchableOpacity
        onPress={() => onNavigate(item)}
        accessibilityLabel={`Ver detalhes do frete ${item.nome}. Distância até coleta ${item.distancia != null ? item.distancia + ' quilômetros' : 'não disponível'}`}
    >
        <View>
            <CardCargo {...item} />
            {item.distancia != null && (
                <View className={styles.distanceBadge} accessibilityLabel={`Distância até a saída: ${item.distancia} km`}>
                    <Text className={styles.distanceBadgeTxt}>{item.distancia} km</Text>
                </View>
            )}
        </View>
    </TouchableOpacity>
));

const LoadingIndicator = () => (
    <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2 text-gray-600">Carregando fretes...</Text>
    </View>
);

const Freight = () => {

    const { freightData, getFreightDado, isLoading } = useFreight();
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortNearest, setSortNearest] = useState(true);
    const [radiusKm, setRadiusKm] = useState<number | null>(null);

    const dataBase = useMemo<FreightItem[]>(() => {
        if (!Array.isArray(freightData)) return [];
        return freightData.map(f => ({
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
        }));
    }, [freightData]);

    const filteredData = useMemo<FreightItem[]>(() => {
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

    const { processedData, locLoading, locError, requestLocation } = useGeoLocation(filteredData, sortNearest, radiusKm);

    const handleSearch = useCallback((query: string) => setSearchQuery(query), []);
    const toggleSort = useCallback(() => setSortNearest(s => !s), []);
    const handleNavigateDetails = useCallback((item: FreightItem) => navigation.navigate('DetailsFreight', { freight: item }), [navigation]);
    const handleRadiusToggle = useCallback(() => {
        setRadiusKm(r => (r === 50 ? 100 : r === 100 ? 200 : r === null ? 50 : null));
    }, []);
    
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setSearchQuery('');
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

    const ListEmptyComponent = useMemo(() => (
        <View className={styles.emptyWrapper}>
            <Text className={styles.emptyText}>
                {locError ? locError : dataBase.length === 0 ? 'Nenhum frete carregado' : 'Nenhum frete corresponde à busca'}
            </Text>
        </View>
    ), [locError, dataBase.length]);


    const isInitialLoading = isLoading && !refreshing && dataBase.length === 0;

    return (
        <View className={styles.containerBase} style={{ paddingTop: insets.top + 10 }}>
            <FreightHeader />
            <SearchBar query={searchQuery} onSearch={handleSearch} />
            <FilterControls
                locLoading={locLoading}
                sortNearest={sortNearest}
                radiusKm={radiusKm}
                onUpdateLocation={requestLocation}
                onToggleSort={toggleSort}
                onToggleRadius={handleRadiusToggle}
            />
            {isInitialLoading ? (
                <LoadingIndicator />
            ) : (
                <FlatList
                    data={processedData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View className={styles.itemSeparator} />}
                    contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 10, flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={ListEmptyComponent}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
};

export default memo(Freight);