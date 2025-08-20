import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';

export class UsuarioController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const usuario = await Usuario.create(req.body);
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating usuario', error });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving usuarios', error });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (usuario) {
                return res.status(200).json(usuario);
            }
            return res.status(404).json({ message: 'Usuario not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving usuario', error });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await Usuario.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedUsuario = await Usuario.findByPk(req.params.id);
                return res.status(200).json(updatedUsuario);
            }
            return res.status(404).json({ message: 'Usuario not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating usuario', error });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await Usuario.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                return res.status(204).send();
            }
            return res.status(404).json({ message: 'Usuario not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting usuario', error });
        }
    }
}