import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ImagemUsuario extends Model {
    id_imagem: number | undefined;
    imgUrl: string | undefined;
}

ImagemUsuario.init({
    id_imagem: {
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
    tableName: 'IMAGEM_USUARIO',
    timestamps: false,
});

export default ImagemUsuario;