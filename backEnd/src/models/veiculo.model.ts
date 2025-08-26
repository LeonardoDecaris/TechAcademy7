import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ImagemVeiculo from './imagem.caminhao';

class Veiculo extends Model {
    id_veiculo: number | undefined;
    marca: string | undefined;
    modelo: string | undefined;
    placa: string | undefined;
    quilometragem: number | undefined;
    capacidade: number | undefined;
    imagemVeiculo_id: number | undefined;
}

Veiculo.init({
    id_veiculo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quilometragem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_carga: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagemVeiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

}, {
    sequelize,
    tableName: 'VEICULO',
    timestamps: false,
});

Veiculo.belongsTo(ImagemVeiculo, { foreignKey: 'imagemVeiculo_id', as: 'imagemVeiculo' });


export default Veiculo;