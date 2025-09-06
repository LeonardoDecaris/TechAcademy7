import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import CardCargo from "./CardCargo";

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

interface Props {
    motorista?: string;
    nome?: string;
    tipo?: string;
    peso?: string;
    saida?: string;
    destino?: string;
    logoEmpresa?: string;
    imagemCarga?: string;
    valor?: string;
}

const CardMyContract = (props: Props) => {
    const semHorario = "Sem horario";


    const navigation = useNavigation<NavigationProp>()
    const handleNavigation = { myVehicle: () => navigation.navigate('MyVehicle'),}


    return (
        <ImageBackground source={require('../../assets/image/logo.jpeg')} className="w-full p-2.5 rounded-2xl border border-white" style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.10)" }} imageStyle={{ borderRadius: 14, opacity: 0.1 }}>
            <View className="pl-2.5 py-2.5">
                <Text className="text-lg font-bold">Contrato atual</Text>

                <Text className="text-sm font-medium">
                    Motorista: <Text className="text-black font-normal">{props.motorista}</Text>
                </Text>

                <Text className="text-sm font-medium">
                    Horário de partida: <Text className="text-black font-normal">{semHorario}</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={handleNavigation.myVehicle}>
                <CardCargo
                    nome={props.nome}
                    tipo={props.tipo}
                    peso={props.peso}
                    saida={props.saida}
                    destino={props.destino}
                    logoEmpresa={props.logoEmpresa}
                    imagemCarga={props.imagemCarga}
                    valor={props.valor}
                />
            </TouchableOpacity>
        </ImageBackground>
    );
}

export default CardMyContract;

