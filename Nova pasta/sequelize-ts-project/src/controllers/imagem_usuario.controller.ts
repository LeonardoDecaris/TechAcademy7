import { Request, Response } from 'express';
import { ImagemUsuario } from '../models/imagem_usuario.model';

export class ImagemUsuarioController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const imagemUsuario = await ImagemUsuario.create(req.body);
            return res.status(201).json(imagemUsuario);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const imagensUsuarios = await ImagemUsuario.findAll();
            return res.status(200).json(imagensUsuarios);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const imagemUsuario = await ImagemUsuario.findByPk(req.params.id);
            if (!imagemUsuario) {
                return res.status(404).json({ message: 'ImagemUsuario not found' });
            }
            return res.status(200).json(imagemUsuario);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await ImagemUsuario.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'ImagemUsuario not found' });
            }
            const updatedImagemUsuario = await ImagemUsuario.findByPk(req.params.id);
            return res.status(200).json(updatedImagemUsuario);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await ImagemUsuario.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'ImagemUsuario not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}