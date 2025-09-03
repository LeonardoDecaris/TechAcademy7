import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface AcessoRapidoPerfilProps {
    titulo: string;
    tipo?: string;
    onPress: () => void;
}

const AcessoRapidoPerfil = ({ titulo, tipo, onPress }: AcessoRapidoPerfilProps) => {
	return (
	    <TouchableOpacity onPress={onPress} className="flex-row justify-between items-center" >
    
            <View className='flex-row items-center gap-2'>
                <FontAwesome5 name={tipo} size={24} color="#575757" />
                <Text className='text-black/80 font-semibold text-base'>{titulo}</Text>
            </View>

            <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
	)
}

export default AcessoRapidoPerfil;
