import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class ImagemUsuario extends Model {
  public id!: number;
  public usuarioId!: number;
  public url!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ImagemUsuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'imagem_usuario',
    timestamps: true,
  }
);

export default ImagemUsuario;