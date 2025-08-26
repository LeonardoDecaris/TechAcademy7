import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Status from './status.model';
import Caminhoneiro from './caminhoneiro.model';
import Carga from './carga.model';
import Empresa from './empresa.model';

class Frete extends Model {
    id_frete: number | undefined;
    saida?: string | undefined;
    destino?: string | undefined;
    valor_frete?: number | undefined;
    data_saida?: Date | undefined;
    data_chegada?: Date | undefined;
    prazo?: number | undefined;
    distancia?: number | undefined;
    status_id?: number | undefined;
    caminhoneiro_id?: number | undefined;
    carga_id?: number | undefined;
    empresa_id?: number | undefined;
}

Frete.init({
    id_frete: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    saida: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    valor_frete: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    data_saida: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    data_chegada: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    prazo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    distancia: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    caminhoneiro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    carga_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'FRETE',
    timestamps: false,
});

Frete.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });
Frete.belongsTo(Caminhoneiro, { foreignKey: 'caminhoneiro_id', as: 'caminhoneiro' });
Frete.belongsTo(Carga, { foreignKey: 'carga_id', as: 'carga' });
Frete.belongsTo(Empresa, { foreignKey: 'empresa_id', as: 'empresa' });

export default Frete;