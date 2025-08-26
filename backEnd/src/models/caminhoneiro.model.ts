import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario.model';
import Veiculo from './veiculo.model';

class Caminhoneiro extends Model {
    public id_caminhoneiro: number | undefined;
    public usuario_id: number | undefined;
    public veiculo_id: number | undefined;
}

Caminhoneiro.init({
    id_caminhoneiro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    veiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'CAMINHONEIRO',
    timestamps: false,
});

Caminhoneiro.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Caminhoneiro.belongsTo(Veiculo, { foreignKey: 'veiculo_id', as: 'veiculo' });

export default Caminhoneiro;