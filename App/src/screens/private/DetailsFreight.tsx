import { View, Text, Button, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import TopoDetailsCargo from '@/src/components/base/TopoDetailsCargo';
import CardInfoCompany from '@/src/components/cards/CardInfoCompany';
import CardDeliveryTime from '@/src/components/cards/CardDeliveryTime';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonPadrao } from '@/src/components/form/Buttons';

type DetailsRouteProp = RouteProp<RootStackParamList, 'DetailsFreight'>;

const DetailsFreight = () => {
  const { params: { freight } } = useRoute<DetailsRouteProp>();

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}>

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

        <Text className='text-xl font-extrabold pl-2.5 pb-2.5'>Detalhes</Text>


        <View className="flex-row gap-4 pb-6">
          <CardInfoCompany />
          <CardDeliveryTime />
        </View>


        <Text className='text-xl font-bold pl-2.5 pb-2.5 text-[#322F2F]'>Descrição do frete</Text>
        <Text className='font-medium text-sm'>{freight.descricao}</Text>

        <View className="w-full flex-row justify-end px-2.5 pt-5">
          <ButtonPadrao
            title='Aceitar'
            typeButton='aceite'
            classname='px-5'
          />
        </View>

      </ScrollView>
    </View>
  );
};

export default DetailsFreight;