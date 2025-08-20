import { Request, Response } from 'express';
import { Status } from '../models/status.model';

export class StatusController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const status = await Status.create(req.body);
            return res.status(201).json(status);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const statuses = await Status.findAll();
            return res.status(200).json(statuses);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const status = await Status.findByPk(req.params.id);
            if (!status) {
                return res.status(404).json({ message: 'Status not found' });
            }
            return res.status(200).json(status);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await Status.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Status not found' });
            }
            const updatedStatus = await Status.findByPk(req.params.id);
            return res.status(200).json(updatedStatus);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await Status.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Status not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}