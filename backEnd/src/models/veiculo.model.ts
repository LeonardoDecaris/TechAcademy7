import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class Veiculo extends Model {
  public id!: number;
  public modelo!: string;
  public marca!: string;
  public ano!: number;
  public placa!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Veiculo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'veiculos',
    timestamps: true,
  }
);

export default Veiculo;