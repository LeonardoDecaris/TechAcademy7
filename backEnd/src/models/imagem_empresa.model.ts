import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class ImagemEmpresa extends Model {
  public id!: number;
  public url!: string;
  public empresaId!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ImagemEmpresa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empresaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresas', // Name of the table in the database
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'imagem_empresas',
  }
);

export default ImagemEmpresa;