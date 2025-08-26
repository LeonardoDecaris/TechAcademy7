import { Request, Response } from 'express';
import Veiculo from '../models/veiculo.model';

export const createVeiculo = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.create(req.body);
        return res.status(201).json(veiculo);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllVeiculos = async (req: Request, res: Response) => {
    try {
        const veiculos = await Veiculo.findAll();
        return res.status(200).json(veiculos);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getVeiculoById = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo not found' });
        }
        return res.status(200).json(veiculo);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateVeiculo = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo not found' });
        }
        await veiculo.update(req.body);
        return res.status(200).json(veiculo);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteVeiculo = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo not found' });
        }
        await veiculo.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};