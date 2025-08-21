import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
	title: string;
	onPress?: () => void;
	typeButton: 'normal' | 'logOutExcluir' | 'aceite';
	classname?: string;
}

const ButtonPadrao = ({ title, onPress, typeButton, classname}: ButtonProps) => {

	const buttonStyles = {
		normal: 'bg-blue-500',
		logOutExcluir: 'bg-red-500',
		aceite: 'bg-green-500',
	}

    return(
		<TouchableOpacity onPress={onPress} className={`py-2 rounded-lg ${buttonStyles[typeButton]} ${classname}`}>
			<Text className={'text-white text-base text-center font-bold'}>
				{title}
			</Text>
      	</TouchableOpacity>
    )
}


const ButtonUpload =  ({ title, onPress, classname}: ButtonProps) => {

	const buttonStyles = "py-2 rounded-lg border border-black";
	const titleStyles = "text-black text-base text-center font-bold";

    return (
		<TouchableOpacity onPress={onPress} className={`${buttonStyles} ${classname}`}>
			<Text className={titleStyles}>
				{title}
			</Text>
      	</TouchableOpacity>
    );
}

export {ButtonPadrao, ButtonUpload};
