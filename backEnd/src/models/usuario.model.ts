import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import ImagemUsuario from './imagem_usuario.model';
import bcrypt from "bcrypt";

class Usuario extends Model {
    id_usuario: number | undefined;
    password: string | undefined;
    nome: string | undefined;
    email: string | undefined;
    cpf: string | undefined;
    cnh: string | undefined;
    datanascimento?: Date | undefined;
    imagemUsuario_id?: number | undefined;

    public async hashPassword() {
        this.password = await bcrypt.hash(this.password!, 10);
    }
    public async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password!);
    }
}

Usuario.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnh: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    datanascimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    imagemUsuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'USUARIO',
    timestamps: false,
});

Usuario.belongsTo(ImagemUsuario, { foreignKey: 'imagemUsuario_id', as: 'imagemUsuario' });

Usuario.beforeCreate(async (user: Usuario) => {
    await user.hashPassword();
});

Usuario.beforeUpdate(async (user: Usuario) => {
    if (user.changed("password")) {
        await user.hashPassword();
    }
});

export default Usuario;