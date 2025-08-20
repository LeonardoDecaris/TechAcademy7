import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; // Adjust the import based on your database configuration

class Status extends Model {
  public id!: number;
  public name!: string;
}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Status',
    tableName: 'statuses', // Adjust the table name if necessary
    timestamps: false, // Set to true if you want to use createdAt and updatedAt fields
  }
);

export default Status;