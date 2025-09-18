import React, { memo, useMemo, useCallback } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';

interface Props {
  tipo?: string;
  peso?: string | number;
  destino?: string;
  progresso?: number;          // pode ser 0–5 ou 0–100
  onPress?: () => void;
  TypeButton?: boolean;
  testID?: string;
}

const containerStyle = 'w-full bg-white px-2.5 pt-4 pb-2.5 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]';
const titleStyle = 'text-black font-semibold text-ms pb-2';
const pesoStyle = 'text-black/60 font-semibold text-ms';
const destinoStyle = 'text-black text-[12px] font-bold';
const rowHeaderStyle = 'w-full flex-row items-center gap-3';
const markersRowStyle = 'flex-row items-center justify-between';
const progressOuterStyle = 'w-full h-[12px] rounded-[20px] bg-[#E5E7EB] p-[2px] mt-3';
const progressInnerRowStyle = { flex: 1, flexDirection: 'row' } as const;

const ACTIVE_COLOR = '#00FF44';
const INACTIVE_COLOR = '#989898';

const normalizeLevel = (value: number) => {
  if (value <= 5) return Math.max(0, Math.min(5, Math.round(value)));

  return Math.max(0, Math.min(5, Math.round(value / 20)));
};

const CardFreight = ({
  tipo,
  peso,
  destino,
  progresso = 0,
  onPress,
  TypeButton = false,
  testID
}: Props) => {
  const level = useMemo(() => normalizeLevel(progresso), [progresso]);

  const handlePress = useCallback(() => {
    if (!TypeButton || !onPress) return;
    onPress();
  }, [TypeButton, onPress]);

  const weightLabel = useMemo(
    () => (peso === 0 || peso ? `${peso}t` : '--'),
    [peso]
  );

  return (
    <TouchableOpacity
      activeOpacity={TypeButton ? 0.1 : 1}
      onPress={handlePress}
      className={containerStyle}
      accessibilityRole={TypeButton ? 'button' : 'summary'}
      accessibilityLabel={`Progresso da carga ${tipo ?? ''} destino ${destino ?? ''}`}
      testID={testID}
    >
      <Text className={titleStyle}>
        Progresso da carga: {tipo ?? '--'} <Text className={pesoStyle}> / {weightLabel}</Text>
      </Text>

      <View className={rowHeaderStyle}>
        <FontAwesome5 name="truck" size={24} color="black" />
        <Text className={destinoStyle}>Destino: {destino ?? '--'}</Text>
      </View>

      <View className="w-full pt-5">
        <View className={markersRowStyle}>
          {Array.from({ length: 5 }).map((_, i) => (
            <FontAwesome5
              key={i}
              name="map-marker-alt"
              size={24}
              color={i < level ? ACTIVE_COLOR : INACTIVE_COLOR}
            />
          ))}
        </View>

        <View className={progressOuterStyle}>
          <View style={progressInnerRowStyle}>
            {Array.from({ length: 5 }).map((_, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: i < level ? ACTIVE_COLOR : 'transparent',
                  borderRadius: 10,
                  marginRight: i < 4 ? 2 : 0
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardFreight;