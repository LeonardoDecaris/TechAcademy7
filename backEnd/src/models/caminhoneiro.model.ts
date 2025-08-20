import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';


class Caminhoneiro extends Model {
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public telefone!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Caminhoneiro.init(
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
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'caminhoneiros',
    timestamps: true,
  }
);

export default Caminhoneiro;