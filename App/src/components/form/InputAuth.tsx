
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface PropsLabel {
    label?: string;
    labelProps?: Partial<React.ComponentProps<typeof Text>>;
}

interface PropsInput {
    id?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    type?: KeyboardTypeOptions;
    inputProps?: Partial<React.ComponentProps<typeof TextInput>>;
}

interface PropsController extends PropsLabel, PropsInput {
    name: string;
    span?: string;
    control: Control<any>;
    rules?: RegisterOptions;
    status?: 'normal' | 'error';
}


const InputAuth = ({ label, labelProps, name, control, rules, span, status, status: statusProp, id, type, placeholder, secureTextEntry, inputProps, ...rest }: PropsController) => {

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
                    <View className="w-full flex flex-col">

                        <Text children={label} className={`${labelStyle} ${status === 'error' ? 'text-red-500/80' : 'text-black/80'}`}  {...labelProps} />

                        <TextInput
                            id={id}
                            keyboardType={type}
                            placeholder={placeholder}
                            className={`${inputStyle} ${StatusInput[status]}`}
                            onChangeText={onChange}
                            secureTextEntry={secureTextEntry}
                            value={value}
                            {...rest}
                            {...inputProps}
                        />

                        {error?.message || span ? (
                            <Text  className={spanStyle} children={error?.message || span} />
                        ) : null}

                    </View>
                );
            }}
        />
    );
};

export default InputAuth;