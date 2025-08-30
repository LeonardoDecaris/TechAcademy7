import { Request, Response } from 'express';
import Usuario from '../models/usuario.model';
import ImagemUsuario from '../models/imagem_usuario.model';

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.create(req.body);
        return res.status(201).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findOne({
            where: { id_usuario: req.params.id },
            include: [
                {
                    model: ImagemUsuario,
                    as: 'imagemUsuario',
                    required: false
                }
            ]
        });
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });
        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        await usuario.update(req.body);
        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario not found' });
        }
        await usuario.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};