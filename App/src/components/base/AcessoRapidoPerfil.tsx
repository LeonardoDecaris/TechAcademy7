import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface AcessoRapidoPerfilProps {
    titulo: string;
    onPress: () => void;
}

const AcessoRapidoPerfil = ({ titulo, onPress }: AcessoRapidoPerfilProps) => {
	return (
	    <TouchableOpacity onPress={onPress} className="flex-row justify-between items-center" >
    
            <View className='flex-row items-center gap-2'>
                <FontAwesome name="user-circle-o" size={30} color="gray" />
                <Text className='text-black/80 font-semibold text-[14px]'>{titulo}</Text>
            </View>

            <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
	)
}

export default AcessoRapidoPerfil;
