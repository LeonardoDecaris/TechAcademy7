import { useState, useCallback, useMemo } from 'react';

import { haversineKm } from '@/src/utils/distance';
import { ORIGENS_PARANA } from '@/src/data/fretesCoordsParana';
import { obterLocalizacao } from '@/src/utils/minhaLocalizacao';

interface Coord {
    latitude: number;
    longitude: number;
}

interface FreightItem {
    id: string;
    saida?: string;
    distancia?: number;
    [key: string]: any;
}

const DISTANCE_PRECISION = 1;
const LOCATION_ERROR_MESSAGE = 'Falha ao obter localização.';


/**
 * Normaliza uma string para busca, removendo acentos e convertendo para minúsculas.
 * @param s A string a ser normalizada.
 * @returns A string normalizada.
 */
const normalizeName = (s?: string): string =>
    (s || '')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim();

/**
 * Cria um mapa de nomes de cidades normalizados para suas coordenadas.
 * @returns Um Map onde a chave é o nome da cidade e o valor é a coordenada.
 */
const createOriginMap = (): Map<string, Coord> => {
    const map = new Map<string, Coord>();
    ORIGENS_PARANA.forEach(o => {
        map.set(normalizeName(o.nome), o.saidaCoord);
    });
    return map;
};


/**
 * Hook customizado para gerenciar a geolocalização do usuário e processar uma lista de itens
 * com base na distância, ordenação e raio.
 * @param items A lista de itens a serem processados.
 * @param sortNearest Se `true`, ordena os itens pelo mais próximo.
 * @param radiusKm Filtra os itens dentro de um raio em quilômetros. `null` para desativar.
 * @returns Um objeto com os dados processados, status de carregamento, erro e a função para solicitar a localização.
 */
export function useGeoLocation<T extends FreightItem>(
    items: T[],
    sortNearest: boolean,
    radiusKm: number | null
) {
    const [userCoord, setUserCoord] = useState<Coord | null>(null);
    const [locLoading, setLocLoading] = useState(false);
    const [locError, setLocError] = useState<string | null>(null);

    const originMap = useMemo(() => createOriginMap(), []);

    const requestLocation = useCallback(async () => {
        setLocError(null);
        setLocLoading(true);

        try {
            const fastLoc = await obterLocalizacao({ highAccuracy: false });
            setUserCoord({ latitude: fastLoc.latitude, longitude: fastLoc.longitude });
            setLocLoading(false); 
            obterLocalizacao({
                highAccuracy: true
            }).then(preciseLoc => {
                setUserCoord({ latitude: preciseLoc.latitude, longitude: preciseLoc.longitude });
            }).catch(preciseError => {
                console.warn('Não foi possível refinar a localização:', preciseError);
            });

        } catch (initialError: unknown) {
            console.error('Falha ao obter a localização inicial (baixa precisão).', initialError);
            if (initialError instanceof Error) {
                setLocError(initialError.message);
            } else {
                setLocError(LOCATION_ERROR_MESSAGE);
            }
            setUserCoord(null);
            setLocLoading(false);
        }
    }, []);

    const processedData = useMemo(() => {
        if (!userCoord) return items;

        const addDistance = (item: T): T & { distancia?: number } => {
            const coord = item.saida ? originMap.get(normalizeName(item.saida)) : undefined;
            const distancia = coord ? Number(haversineKm(userCoord, coord).toFixed(DISTANCE_PRECISION)) : undefined;
            return { ...item, distancia };
        };

        const withinRadius = (item: { distancia?: number }): boolean => {
            if (radiusKm === null) return true;
            return item.distancia !== undefined && item.distancia <= radiusKm;
        };

        const sortByDistance = (a: { distancia?: number }, b: { distancia?: number }): number => {
            if (!sortNearest) return 0;
            if (a.distancia === undefined) return 1;
            if (b.distancia === undefined) return -1;
            return a.distancia - b.distancia;
        };

        return items.map(addDistance).filter(withinRadius).sort(sortByDistance);
    }, [items, userCoord, sortNearest, radiusKm, originMap]);

    return { processedData, locLoading, locError, requestLocation, userCoord };
}

/**
 * Calcula a distância em km entre um ponto de saída e um de destino.
 * @param saida O nome da cidade de saída.
 * @param destino O nome da cidade de destino.
 * @returns A distância em quilômetros ou `undefined` se as coordenadas não forem encontradas.
 */
export const calculateFreightDistance = (saida?: string, destino?: string): number | undefined => {
    const originMap = createOriginMap();
    const saidaCoord = saida ? originMap.get(normalizeName(saida)) : undefined;
    const destinoCoord = destino ? originMap.get(normalizeName(destino)) : undefined;

    if (saidaCoord && destinoCoord) {
        return Number(haversineKm(saidaCoord, destinoCoord).toFixed(DISTANCE_PRECISION));
    }
    return undefined;};