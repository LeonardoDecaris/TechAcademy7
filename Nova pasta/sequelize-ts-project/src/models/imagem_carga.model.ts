import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class ImagemCarga extends Model {
  public id!: number;
  public cargaId!: number;
  public url!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ImagemCarga.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cargaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cargas', // Name of the referenced table
        key: 'id',
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'imagem_cargas',
    timestamps: true,
  }
);

export default ImagemCarga;