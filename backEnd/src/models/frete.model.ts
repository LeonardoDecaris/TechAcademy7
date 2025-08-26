import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Status from './status.model';
import Caminhoneiro from './caminhoneiro.model';
import Carga from './carga.model';
import Empresa from './empresa.model';

class Frete extends Model {
    id_frete: number | undefined;
    saida: string | undefined;
    destino: string | undefined;
    valor_frete: number | undefined;
    data_saida: Date | undefined;
    data_chegada: Date | undefined;
    prazo: number | undefined;
    distancia: number | undefined;
    status_id: number | undefined;
    caminhoneiro_id: number | undefined;
    carga_id: number | undefined;
    empresa_id: number | undefined;
}

Frete.init({
    id_frete: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    saida: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_frete: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data_saida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_chegada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    prazo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    distancia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    caminhoneiro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    carga_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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