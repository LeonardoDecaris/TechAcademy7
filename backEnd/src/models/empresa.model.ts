import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ImagemEmpresa from './imagem_empresa.model';

class Empresa extends Model {
    id_empresa: number | undefined;
    nome: string | undefined;
    tipo: string | undefined;
    avaliacao: number | undefined;
    localidade: string | undefined;
    imagemEmpresa_id: number | undefined;
}

Empresa.init({
    id_empresa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avaliacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    localidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagemEmpresa_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'EMPRESA',
    timestamps: false,
});

Empresa.belongsTo(ImagemEmpresa, { foreignKey: 'imagemEmpresa_id', as: 'imagemEmpresa' })

export default Empresa;