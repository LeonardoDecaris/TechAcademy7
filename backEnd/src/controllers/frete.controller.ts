import { Request, Response } from 'express';
import { Frete } from '../models/frete.model';

export class FreteController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const frete = await Frete.create(req.body);
            return res.status(201).json(frete);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating frete', error });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const fretes = await Frete.findAll();
            return res.status(200).json(fretes);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving fretes', error });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const frete = await Frete.findByPk(req.params.id);
            if (!frete) {
                return res.status(404).json({ message: 'Frete not found' });
            }
            return res.status(200).json(frete);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving frete', error });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await Frete.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Frete not found' });
            }
            const updatedFrete = await Frete.findByPk(req.params.id);
            return res.status(200).json(updatedFrete);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating frete', error });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await Frete.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Frete not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting frete', error });
        }
    }
}