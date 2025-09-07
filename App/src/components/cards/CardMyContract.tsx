import { Text, TouchableOpacity, View } from "react-native";
import CardCargo from "./CardCargo";

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
    onPress?: () => void;
}

const CardMyContract = (props: Props) => {
    const semHorario = "Sem horario";

    return (
        <View className="w-full p-2.5 bg-amber-800/10 rounded-2xl border border-white" style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.10)" }} >
            <View className="pl-2.5 py-2.5">
                <Text className="text-lg font-bold">Contrato atual</Text>

                <Text className="text-sm font-medium">
                    Motorista: <Text className="text-black font-normal">{props.motorista}</Text>
                </Text>

                <Text className="text-sm font-medium">
                    Horário de partida: <Text className="text-black font-normal">{semHorario}</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={props.onPress}>
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
        </View>
    );
}

export default CardMyContract;