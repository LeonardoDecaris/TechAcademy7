import { View, Text } from "react-native";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

interface DropDownProps {
    name: string;
    label?: string;
    placeholder?: string;
    span?: string;

    items: { label: string; value: string }[];
    rules?: RegisterOptions;
    control: Control<any>;
}

const DropDown = ({ name, control, label, rules, items, placeholder, span }: DropDownProps) => {
    
    const spanStyle = "text-red-500 text-[10px] pl-2.5";
    const labelStyle = "font-semibold text-[14px] pl-2.5";

    return (
        <Controller control={control} name={name} rules={rules} render={({ field: { onChange, value }, fieldState: { error } }) => (

                <View className="w-full flex flex-col mb-2 ">
                    {label && (
                        <Text  children={label}   className={`${labelStyle} ${ error ? "text-red-500/80" : "text-black/80" }`}/>
                    )}

                    <View className="w-[50%] border border-black/40 rounded-lg" 
                        style={{ height: 40, display: 'flex', justifyContent: 'center' }}
                    >
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={{ width: "100%"}}
                        >
                            {placeholder && (
                                <Picker.Item
                                    label={placeholder}
                                    value={null}
                                    enabled={false}
                                />
                            )}
                            {items.map((item) => (
                                <Picker.Item
                                    key={item.value}
                                    label={item.label}
                                    value={item.value}
                                />
                            ))}
                        </Picker>
                    </View>
                    
                    {error?.message || span ? ( <Text className={spanStyle} children={error?.message || span} /> ) : null}
                
                </View>
            )}
        />
    );
};

export default DropDown;