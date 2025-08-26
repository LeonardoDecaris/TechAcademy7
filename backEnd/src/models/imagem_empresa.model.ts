import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ImagemEmpresa extends Model {
    id_imagemEmpresa: number | undefined;
    imgUrl: string | undefined;
}

ImagemEmpresa.init({
    id_imagemEmpresa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'IMAGEM_EMPRESA',
    timestamps: false,
});

export default ImagemEmpresa;