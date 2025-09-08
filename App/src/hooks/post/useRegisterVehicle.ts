import { useForm } from "react-hook-form";

interface Vehicle {
    marca: string;
    modelo: string;
    placa: string;
    anoFabricacao: string;
    quilometragem: string;
}

function useRegisterVehicle() {

      const { control, handleSubmit, formState: { errors }, watch } = useForm<Vehicle>({
        mode: "onSubmit",
      });

    const rules = {
        marca: {
            required: 'Marca é obrigatória',
        },
        modelo: {
            required: 'Modelo é obrigatório',
        },
        placa: {
            required: 'Placa é obrigatória',
        },
        anoFabricacao: {
            required: 'Ano de fabricação é obrigatório',
        },
        quilometragem: {
            required: 'Quilometragem é obrigatória',
        },
    };

    return {
        rules,
        control,
        handleSubmit, 
        errors,
        watch
    };
}


export default useRegisterVehicle;