import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	title: string;
	onPress?: () => void;
	typeButton?: 'normal' | 'logOutExcluir' | 'aceite';
	classname?: string;
	disabled?: boolean;
}

const ButtonPadrao = ({ title, onPress, typeButton = "normal", classname, }: ButtonProps) => {

	const buttonStyles = {
		normal: 'bg-[#322F2F]',
		logOutExcluir: 'bg-red-500',
		aceite: 'bg-green-500',
	}

    return(
		<TouchableOpacity onPress={onPress} className={`py-2.5 rounded-lg ${buttonStyles[typeButton]} ${classname}`}>
			<Text className={'text-white text-center font-bold text-lg'}>
				{title}
			</Text>
      	</TouchableOpacity>
    )
}

const ButtonUpload =  ({ title, onPress, classname, disabled }: ButtonProps) => {

	const buttonStyles = "py-2 px-4 rounded-lg border border-black bg-[#322F2F]";
	const titleStyles = "text-white text-base text-center font-bold";

    return (
		<TouchableOpacity onPress={onPress} className={`${buttonStyles} ${classname}`} disabled={disabled}>
			<Text className={titleStyles}>
				{title}
			</Text>
      	</TouchableOpacity>
    );
}

export {ButtonPadrao, ButtonUpload};
