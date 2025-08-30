import { Text, View } from "react-native";
import CardCarga from "./CardGarca";

interface CardCargaProps {
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

const CardMeuContrato = (props: CardCargaProps) => {
        const semHorario = "Sem horario";


    return(
        <View className="w-full p-2.5 bg-gray-100/20 rounded-2xl border border-white" style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.15)" }}>
            <View className="pl-2.5 py-2.5">
                <Text className="text-lg font-bold">Contrato atual</Text>

                <Text className="text-[12px] font-medium">
                    Motorista: <Text className="text-black font-normal">{props.motorista}</Text>
                </Text>
                
                <Text className="text-[12px] font-medium">
                    Horário de partida: <Text className="text-black font-normal">{semHorario}</Text>
                </Text>
            </View>
                <CardCarga
                    nome={props.nome}
                    tipo={props.tipo}
                    peso={props.peso}
                    saida={props.saida}
                    destino={props.destino}
                    logoEmpresa={props.logoEmpresa}
                    imagemCarga={props.imagemCarga}
                    valor={props.valor}
                />
        </View>
    );
}

export default CardMeuContrato;

