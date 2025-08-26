import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Veiculo from './veiculo.model';
import TipoCarga from './tipo_carga.model';

class VeiculoTipoCarga extends Model {
    public tipoCarga_id: number | undefined;
    public veiculo_id: number | undefined;
}

VeiculoTipoCarga.init({
    tipoCarga_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    veiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'VEICULO_TIPO_CARGA',
    timestamps: false,
});

VeiculoTipoCarga.belongsTo(TipoCarga, { foreignKey: 'tipoCarga_id', as: 'tipoCarga' });
VeiculoTipoCarga.belongsTo(Veiculo, { foreignKey: 'veiculo_id', as: 'veiculo' });

export default VeiculoTipoCarga;