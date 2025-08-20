import { Request, Response } from 'express';
import { Caminhoneiro } from '../models/caminhoneiro.model';

export class CaminhoneiroController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const caminhoneiro = await Caminhoneiro.create(req.body);
            return res.status(201).json(caminhoneiro);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating caminhoneiro', error });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const caminhoneiros = await Caminhoneiro.findAll();
            return res.status(200).json(caminhoneiros);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving caminhoneiros', error });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const caminhoneiro = await Caminhoneiro.findByPk(req.params.id);
            if (caminhoneiro) {
                return res.status(200).json(caminhoneiro);
            }
            return res.status(404).json({ message: 'Caminhoneiro not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving caminhoneiro', error });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await Caminhoneiro.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedCaminhoneiro = await Caminhoneiro.findByPk(req.params.id);
                return res.status(200).json(updatedCaminhoneiro);
            }
            return res.status(404).json({ message: 'Caminhoneiro not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating caminhoneiro', error });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await Caminhoneiro.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                return res.status(204).send();
            }
            return res.status(404).json({ message: 'Caminhoneiro not found' });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting caminhoneiro', error });
        }
    }
}