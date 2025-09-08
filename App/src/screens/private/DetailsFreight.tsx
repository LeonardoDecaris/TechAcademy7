import { View, Text, Button, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import TopoDetailsCargo from '@/src/components/base/TopoDetailsCargo';
import CardInfoCompany from '@/src/components/cards/CardInfoCompany';
import CardDeliveryTime from '@/src/components/cards/CardDeliveryTime';
import { SafeAreaView } from 'react-native-safe-area-context';

type DetailsRouteProp = RouteProp<RootStackParamList, 'DetailsFreight'>;

const DetailsFreight = () => {
  const { params: { freight } } = useRoute<DetailsRouteProp>();

  return (
    <SafeAreaView className="p-5"  style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView showsVerticalScrollIndicator={false}>



      <TopoDetailsCargo
        nome={freight.nome}
        tipo={freight.tipo}
        peso={freight.peso}
        saida={freight.saida}
        destino={freight.destino}
        valor={freight.valor}
        valorFrete={freight.valorFrete}
        descricao={freight.descricao}
      />

      <Text className='text-2xl font-extrabold mb-4'>Detalhes</Text>


      <View className="flex-row gap-4 mb-10">
        <View className="flex-1">
          <CardInfoCompany />
        </View>
        <View className="flex-1">
          <CardDeliveryTime />
        </View>
      </View>

      <View className="flex-column gap-1 mb-6" >
        <Text className='text-2xl font-extrabold mb-4'>Descrição do frete</Text>
        <Text className='text-base mb-4'>{freight.descricao}</Text>
      </View>

      <View className="flex-row justify-end">
          <Button title="Aceitar" color='#2AC986' onPress={() => {}} />
      </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsFreight;