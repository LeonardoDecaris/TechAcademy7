import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ImagemCarga from './imagem_carga.model';
import TipoCarga from './tipo_carga.model';

class Carga extends Model {
    public id_carga: number | undefined;
    public nome: string | undefined;
    public descricao: string | undefined;
    public peso: number | undefined;
    public valor_carga: number | undefined;
    public imagemCarga_id: number | undefined;
    public tipoCarga_id: number | undefined;
}

Carga.init({
    id_carga: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_carga: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagemCarga_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipoCarga_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'CARGA',
    timestamps: false,
});

Carga.belongsTo(ImagemCarga, { foreignKey: 'imagemCarga_id', as: 'imagemCarga' });
Carga.belongsTo(TipoCarga, { foreignKey: 'tipoCarga_id', as: 'tipoCarga' });

export default Carga;