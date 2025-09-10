import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface PropsInput {
    id?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    type?: KeyboardTypeOptions;
    inputProps?: Partial<React.ComponentProps<typeof TextInput>>;
}

interface PropsController extends PropsInput {
    name: string;
    span?: string;
    [key: string]: any;
    control: Control<any>;
    rules?: RegisterOptions;
    statusInput?: 'normal' | 'error';
}

const spanStyle = "text-red-500 text-[10px] pl-2.5";
const labelStyle = "font-semibold text-[14px] pl-2.5";
const inputStyle = "w-full p-2.5 font-semibold border rounded-lg bg-white";

const STATUS_INPUT: Record<'normal' | 'error', string> = {
    normal: ' text-black/80 border-black/40 shadow-[0_2px_4px_rgba(0,0,0,0.25)] ',
    error: 'text-red-500 border-red-500/40 shadow-[0_2px_4px_rgba(255,0,0,0.25)] placeholder:text-red-500/80'
};

const InputAuthData = ({ name, control, rules, span, statusInput, id, inputProps, ...rest }: PropsController) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const status = error ? 'error' : (statusInput || 'normal');
                
                return (
                    <View className="w-[48%] flex flex-col">
                        <Text
                            children={'Data de Nascimento'}
                            className={`${labelStyle} ${status === 'error' ? 'text-red-500/80' : 'text-black/80'}`}
                        />
                        <TextInput
                            id={id}
                            placeholder={'DD/MM/AAAA'}
                            className={`${inputStyle} ${STATUS_INPUT[status]}`}
                            onChangeText={onChange}
                            value={value}
                            {...rest}
                            {...inputProps}
                        />
                        {(error?.message || span) && (
                            <Text className={spanStyle} children={error?.message || span} />
                        )}
                    </View>
                );
            }}
        />
    );
};

export default InputAuthData;