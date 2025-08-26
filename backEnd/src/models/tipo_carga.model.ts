import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class TipoCarga extends Model {
    id_tipo: number | undefined;
    nome: string | undefined;
}

TipoCarga.init({
    id_tipo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'TIPO_CARGA',
    timestamps: false,
});

export default TipoCarga;