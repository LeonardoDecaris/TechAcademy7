import { Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface cardFreteProps {
    tipo?: string;
    peso?: string;
    destino?: string;
    progresso?: number;
}


const CardFrete = ({tipo, peso, destino }:cardFreteProps) => {
    const containerStyle = "bg-white px-2.5 pt-4 pb-2-5 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]";
    const pesoStyle = "text-black/60 font-semobold text-ms";
    const titleStyle = "text-black font-semobold text-ms";
    const destinoStyle = "text-black text-xs font-bold";

    return(
        <View className={`${containerStyle}`}>
            <Text className={`${titleStyle}`}>
                Progresso da carga: {tipo} <Text className={`${pesoStyle}`}> / {peso}t</Text>
            </Text>

           <View className="flex-1 flex-row items-center gap-3">
                <AntDesign name="arrowright" size={16} color="white" />
                <Text className={`${destinoStyle}`}>Destino: {destino}</Text>
           </View>

        </View>
    )
}

export default CardFrete;