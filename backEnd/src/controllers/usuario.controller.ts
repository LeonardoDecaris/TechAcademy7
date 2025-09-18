import jwt from 'jsonwebtoken';
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
        return res.status(500).json({ message: 'Erro interno do servidor.' });
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
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findOne({
            where: { id_usuario: req.params.id },
            include: [{
                model: ImagemUsuario,
                as: 'imagemUsuario',
                required: false
            }]
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await usuario.update(req.body);
        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await usuario.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email, cpf } = req.body as { email?: string; cpf?: string };

        if (!email || !cpf) {
            return res.status(400).json({ message: 'E-mail e CPF são obrigatórios.' });
        }

        const usuario = await Usuario.findOne({ where: { email, cpf } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado com esse e-mail e CPF.' });
        }

        const expMinutes = Number(process.env.RESET_TOKEN_EXP_MIN ?? 15);
        const baseSecret = process.env.RESET_PASSWORD_SECRET || process.env.JWT_SECRET;

        if (!baseSecret) {
            return res.status(500).json({ message: 'Variável RESET_PASSWORD_SECRET não configurada.' });
        }

        const senhaHashAtual = (usuario as any).password || (usuario as any).senha;
        const secret = `${baseSecret}-${senhaHashAtual}`;

        const token = jwt.sign(
            { sub: (usuario as any).id_usuario, email, cpf },
            secret,
            { expiresIn: `${expMinutes}m` }
        );

        const response: any = { message: 'Solicitação registrada' };
        if (process.env.NODE_ENV !== 'production') {
            response.token = token;
            response.expiresAt = new Date(Date.now() + expMinutes * 60 * 1000);
        }

        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, cpf, token, newPassword } = req.body as {
            email?: string;
            cpf?: string;
            token?: string;
            newPassword?: string;
        };

        if (!email || !cpf || !token || !newPassword) {
            return res.status(400).json({ message: 'E-mail, CPF, token e nova senha são obrigatórios.' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres.' });
        }

        const usuario = await Usuario.findOne({ where: { email, cpf } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado com esse e-mail e CPF.' });
        }

        const baseSecret = process.env.RESET_PASSWORD_SECRET || process.env.JWT_SECRET;
        if (!baseSecret) {
            return res.status(500).json({ message: 'Variável RESET_PASSWORD_SECRET não configurada.' });
        }

        const senhaHashAtual = (usuario as any).password || (usuario as any).senha;
        const secret = `${baseSecret}-${senhaHashAtual}`;

        try {
            const payload = jwt.verify(token, secret) as any;
            if (String(payload.sub) !== String((usuario as any).id_usuario)) {
                return res.status(400).json({ message: 'Token inválido.' });
            }
        } catch {
            return res.status(400).json({ message: 'Token inválido.' });
        }

        await (usuario as any).update({ password: newPassword });

        return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};