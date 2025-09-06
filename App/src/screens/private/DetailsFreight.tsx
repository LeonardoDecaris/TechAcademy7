import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';

type DetailsRouteProp = RouteProp<RootStackParamList, 'DetailsFreight'>;

const DetailsFreight = () => {
  const { params: { freight } } = useRoute<DetailsRouteProp>();

  return (
    <View className="p-5">
      <Text className="text-2xl font-extrabold mb-4">{freight.nome}</Text>
      <Text className="mb-1">Tipo: {freight.tipo}</Text>
      <Text className="mb-1">Peso: {freight.peso}</Text>
      <Text className="mb-1">Saída: {freight.saida}</Text>
      <Text className="mb-1">Destino: {freight.destino}</Text>
      <Text className="mb-1">Valor: {freight.valor}</Text>
    </View>
  );
};

export default DetailsFreight;