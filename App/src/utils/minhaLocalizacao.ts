import * as Location from 'expo-location';

export interface Coordenadas {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  altitude?: number | null;
  speed?: number | null;
  heading?: number | null;
  timestamp: number;
}

export interface LocalizacaoEndereco extends Coordenadas {
  endereco?: string;
}

/**
 * Solicita permissão e retorna a localização atual.
 * @param reverseGeocode Se true tenta obter endereço (mais lento).
 * @param highAccuracy Se true usa alta precisão (mais bateria).
 */
export async function obterLocalizacao(
  { reverseGeocode = false, highAccuracy = false } = {}
): Promise<LocalizacaoEndereco> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão de localização negada.');
  }

  const accuracy: Location.LocationAccuracy =
    highAccuracy ? Location.Accuracy.Highest : Location.Accuracy.Balanced;

  const pos = await Location.getCurrentPositionAsync({ accuracy });

  const base: LocalizacaoEndereco = {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    accuracy: pos.coords.accuracy,
    altitude: pos.coords.altitude,
    speed: pos.coords.speed,
    heading: pos.coords.heading,
    timestamp: pos.timestamp
  };

  if (!reverseGeocode) return base;

  try {
    const geocode = await Location.reverseGeocodeAsync({
      latitude: base.latitude,
      longitude: base.longitude
    });
    if (geocode.length) {
      const g = geocode[0];
      base.endereco = [
        g.street || g.name,
        g.district,
        g.subregion,
        g.region,
        g.postalCode
      ].filter(Boolean).join(', ');
    }
  } catch {
  }

  return base;
}

/**
 * Inicia observação contínua. Retorna função para parar.
 * @param onUpdate callback em cada atualização
 * @param highAccuracy melhor precisão (mais bateria)
 */
export async function observarLocalizacao(
  onUpdate: (coord: Coordenadas) => void,
  highAccuracy = false
): Promise<() => void> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permissão de localização negada.');
  }

  const accuracy: Location.LocationAccuracy =
    highAccuracy ? Location.Accuracy.Highest : Location.Accuracy.Balanced;

  const subscription = await Location.watchPositionAsync(
    {
      accuracy,
      timeInterval: 5000,     
      distanceInterval: 5
    },
    (pos) => {
      onUpdate({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude,
        speed: pos.coords.speed,
        heading: pos.coords.heading,
        timestamp: pos.timestamp
      });
    }
  );

  return () => subscription.remove();
}

/**
 * Verifica rapidamente se permissão já foi concedida.
 */
export async function temPermissaoLocalizacao(): Promise<boolean> {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status === 'granted';
}