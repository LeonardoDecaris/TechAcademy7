import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ImagemCarga extends Model {
    id_imagemCarga: number | undefined;
    imgUrl: string | undefined;
}

ImagemCarga.init({
    id_imagemCarga: {
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
    tableName: 'IMAGEM_CARGA',
    timestamps: false,
});

export default ImagemCarga;