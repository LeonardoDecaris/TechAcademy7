import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class Usuario extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Usuario.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: true,
  }
);

export default Usuario;