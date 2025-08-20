import { Request, Response } from 'express';
import { Carga } from '../models/carga.model';

export class CargaController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const carga = await Carga.create(req.body);
            return res.status(201).json(carga);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating carga', error });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const cargas = await Carga.findAll();
            return res.status(200).json(cargas);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving cargas', error });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const carga = await Carga.findByPk(req.params.id);
            if (!carga) {
                return res.status(404).json({ message: 'Carga not found' });
            }
            return res.status(200).json(carga);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving carga', error });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const carga = await Carga.findByPk(req.params.id);
            if (!carga) {
                return res.status(404).json({ message: 'Carga not found' });
            }
            await carga.update(req.body);
            return res.status(200).json(carga);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating carga', error });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const carga = await Carga.findByPk(req.params.id);
            if (!carga) {
                return res.status(404).json({ message: 'Carga not found' });
            }
            await carga.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting carga', error });
        }
    }
}