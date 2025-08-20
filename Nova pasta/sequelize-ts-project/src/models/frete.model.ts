import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class Frete extends Model {
  public id!: number;
  public origem!: string;
  public destino!: string;
  public valor!: number;
  public data!: Date;

  // Define any associations here
  public static associate(models: any) {
    // Example: Frete.belongsTo(models.Empresa, { foreignKey: 'empresaId' });
  }
}

Frete.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'fretes',
  }
);

export default Frete;