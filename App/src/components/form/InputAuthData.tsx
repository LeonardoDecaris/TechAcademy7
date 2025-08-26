
import { KeyboardTypeOptions, StyleProp, Text, TextInput, TextStyle, View } from "react-native";
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
    rules?: RegisterOptions;
    control: Control<any>;
    [key: string]: any;
    status?: 'normal' | 'error';
}

const InputAuthData = ({ name, control, rules, span, status: statusProp, id,  className, inputProps, ...rest }: PropsController) => {

    const spanStyle = "text-red-500 text-[10px] pl-2.5";
    const labelStyle = "font-semibold text-[14px] pl-2.5";
    const inputStyle = "w-full p-2.5 font-semibold border rounded-lg bg-white";

    const StatusInput = {
        normal: ' text-black/80 border-black/40 shadow-[0_2px_4px_rgba(0,0,0,0.25)] ',
        error: 'text-red-500 border-red-500/40 shadow-[0_2px_4px_rgba(255,0,0,0.25)] placeholder:text-red-500/80'
    };

    return (
        <Controller control={control} name={name} rules={rules} render={({ field: { onChange, value }, fieldState: { error } }) => {
            const status = error ? 'error' : (statusProp || 'normal');

            return (
                <View className="w-[48%] flex flex-col">

                    <Text children={'Data de Nascimento'} className={`${labelStyle} ${status === 'error' ? 'text-red-500/80' : 'text-black/80'}`}/>

                    <TextInput
                        id={id}
                        placeholder={'DD/MM/AAAA'}
                        className={`${inputStyle} ${StatusInput[status]}`}
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                        {...inputProps}
                    />
                    {error?.message || span ? (
                        <Text className={spanStyle} children={error?.message || span} />
                    ) : null}
                </View>
            );
        }} />
    );
};

export default InputAuthData;