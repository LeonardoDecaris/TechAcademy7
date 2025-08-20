import { Request, Response } from 'express';
import { Veiculo } from '../models/veiculo.model';

export class VeiculoController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const veiculo = await Veiculo.create(req.body);
            return res.status(201).json(veiculo);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating veiculo', error });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const veiculos = await Veiculo.findAll();
            return res.status(200).json(veiculos);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving veiculos', error });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const veiculo = await Veiculo.findByPk(req.params.id);
            if (!veiculo) {
                return res.status(404).json({ message: 'Veiculo not found' });
            }
            return res.status(200).json(veiculo);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving veiculo', error });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await Veiculo.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Veiculo not found' });
            }
            const updatedVeiculo = await Veiculo.findByPk(req.params.id);
            return res.status(200).json(updatedVeiculo);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating veiculo', error });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await Veiculo.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Veiculo not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting veiculo', error });
        }
    }
}