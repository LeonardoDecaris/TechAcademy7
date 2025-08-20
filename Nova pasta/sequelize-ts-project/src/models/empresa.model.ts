import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class Empresa extends Model {
  public id!: number;
  public nome!: string;
  public cnpj!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Empresa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'empresas',
    timestamps: true,
  }
);

export default Empresa;