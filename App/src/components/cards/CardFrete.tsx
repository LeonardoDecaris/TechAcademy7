import { SafeAreaView, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";

interface cardFreteProps {
  tipo?: string;
  peso?: string;
  destino?: string;
  progresso?: number; 
}

const CardFrete = ({ tipo, peso, destino, progresso = 0 }: cardFreteProps) => {

  const pesoStyle = "text-black/60 font-semibold text-ms";
  const destinoStyle = "text-black text-[12px] font-bold";
  const titleStyle = "text-black font-semibold text-ms pb-2";
  const containerStyle ="w-full bg-white px-2.5 pt-4 pb-2.5 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.15)]";


  const toLevel = (p: number) => {
    if (p <= 5) return Math.max(0, Math.min(5, Math.round(p)));
    return Math.max(0, Math.min(5, Math.round(p / 20))); 
  };
  const level = toLevel(progresso);

  return (
    <View className={containerStyle}>

        <Text className={titleStyle}>
          Progresso da carga: {tipo} <Text className={pesoStyle}> / {peso}t</Text>
        </Text>

        <View className="w-full flex-row items-center gap-3">
          <FontAwesome5 name="truck" size={24} color="black" />
          <Text className={destinoStyle}>Destino: {destino}</Text>
        </View>


      <View className="w-full pt-5">

        <View className="flex-row items-center justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <FontAwesome5 key={i} name="map-marker-alt" size={24} color={i < level ? "#00FF44" : "#989898"}/>
          ))}
        </View>

        <View className="w-full h-[12px] rounded-[20px] bg-[#E5E7EB] p-[2px] mt-3">

          <View style={{ flex: 1, flexDirection: "row" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <View 
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: i < level ? "#00FF44" : "transparent",
                  borderRadius: 10,
                  marginRight: i < 4 ? 2 : 0, 
                }}
              />
            ))}
          </View>

        </View>

      </View>
    </View>
  );
};

export default CardFrete;