import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class Carga extends Model {
  public id!: number;
  public descricao!: string;
  public peso!: number;
  public volume!: number;
  public dataCarga!: Date;

  // Define any associations here
  public static associate(models: any) {
    // Example: Carga.belongsTo(models.Empresa, { foreignKey: 'empresaId' });
  }
}

Carga.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    volume: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dataCarga: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Carga',
    tableName: 'cargas',
    timestamps: true,
  }
);

export default Carga;