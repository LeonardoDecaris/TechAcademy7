import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopoDetailsCargo from '@/src/components/base/TopoDetailsCargo';
import CardInfoCompany from '@/src/components/cards/CardInfoCompany';
import CardDeliveryTime from '@/src/components/cards/CardDeliveryTime';
import { ButtonPadrao } from '@/src/components/form/Buttons';
import useGetVehicleData from '@/src/hooks/hookVehicle/useGetVehicleData';
import useConfirmFreight from '@/src/hooks/useConfirmFreight';
import AlertNotification from '@/src/components/modal/AlertNotification';
import ModalConfirmation from '@/src/components/modal/ModalConfirmation';

type DetailsRouteProp = RouteProp<RootStackParamList, 'DetailsFreight'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const containerPaddingTop = 20;
const cardsRowStyle = 'flex-row gap-4 pb-6';
const descriptionTextStyle = 'font-medium text-sm';
const actionRowStyle = 'w-full flex-row justify-end px-2.5 pt-5';
const sectionTitleStyle = 'text-xl font-extrabold pl-2.5 pb-2.5';
const scrollContentStyle = { paddingHorizontal: 10, paddingBottom: 50 };
const descriptionTitleStyle = 'text-xl font-bold pl-2.5 pb-2.5 text-[#322F2F]';

const DetailsFreight = () => {
  const { params: { freight } } = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { getVehicleData, veiculo } = useGetVehicleData();
  const { confirmFreight, mensage, success, successVisible, closeSuccessNotification } = useConfirmFreight(freight.id, veiculo?.id_caminhoneiro);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getVehicleData();
  }, [getVehicleData]);

  const handleAcceptFreight = useCallback(() => {
    if (veiculo) {
      confirmFreight();
    } else {
      setIsModalVisible(true);
    }
  }, [veiculo, confirmFreight]);

  const handleConfirmModal = useCallback(() => {
    setIsModalVisible(false);
    navigation.navigate('RegisterVehicle');
  }, [navigation]);

  const handleCancelModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: containerPaddingTop }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={scrollContentStyle}
      >
        <ModalConfirmation
          visible={isModalVisible}
          mode="no_vehicle"
          onConfirm={handleConfirmModal}
          onCancel={handleCancelModal}
        />

        <AlertNotification
          visible={successVisible}
          status={success as "success" | "error" | "loading"}
          messagem={mensage}
          onDismiss={closeSuccessNotification}
        />

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

        <Text className={sectionTitleStyle}>Detalhes</Text>

        <View className={cardsRowStyle}>
          <CardInfoCompany />
          <CardDeliveryTime
            destino={freight.destino}
            distancia={freight.distanciaDestino}
            prazo={freight.prazo}
          />
        </View>

        <Text className={descriptionTitleStyle}>Descrição do frete</Text>
        <Text className={descriptionTextStyle}>{freight.descricao}</Text>

        <View className={actionRowStyle}>

          
          <ButtonPadrao
            title='Aceitar'
            typeButton='aceite'
            classname='px-5'
            onPress={handleAcceptFreight}
            accessibilityLabel='Aceitar este frete'
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(DetailsFreight);