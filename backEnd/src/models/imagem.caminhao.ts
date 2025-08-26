import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ImagemVeiculo extends Model {
    id_imagemVeiculo: number | undefined;
    imgUrl: string | undefined;
}

ImagemVeiculo.init({
    id_imagemVeiculo: {
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
    tableName: 'IMAGEM_VEICULO',
    timestamps: false,
});

export default ImagemVeiculo;