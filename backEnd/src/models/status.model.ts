import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Status extends Model {
    id_status: number | undefined;
    nome: string | undefined;
}

Status.init({
    id_status: {
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
    tableName: 'STATUS',
    timestamps: false,
});

export default Status;