import { Request, Response } from 'express';
import VeiculoTipoCarga from '../models/veiculo_tipoCarga.model';

export const createVeiculoTipoCarga = async (req: Request, res: Response) => {
    try {
        const veiculoTipoCarga = await VeiculoTipoCarga.create(req.body);
        return res.status(201).json(veiculoTipoCarga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllVeiculoTipoCarga = async (req: Request, res: Response) => {
    try {
        const veiculoTipoCargaList = await VeiculoTipoCarga.findAll();
        return res.status(200).json(veiculoTipoCargaList);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getVeiculoTipoCargaById = async (req: Request, res: Response) => {
    try {
        const veiculoTipoCarga = await VeiculoTipoCarga.findByPk(req.params.id);
        if (!veiculoTipoCarga) {
            return res.status(404).json({ message: 'VeiculoTipoCarga not found' });
        }
        return res.status(200).json(veiculoTipoCarga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateVeiculoTipoCarga = async (req: Request, res: Response) => {
    try {
        const veiculoTipoCarga = await VeiculoTipoCarga.findByPk(req.params.id);
        if (!veiculoTipoCarga) {
            return res.status(404).json({ message: 'VeiculoTipoCarga not found' });
        }
        await veiculoTipoCarga.update(req.body);
        return res.status(200).json(veiculoTipoCarga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteVeiculoTipoCarga = async (req: Request, res: Response) => {
    try {
        const veiculoTipoCarga = await VeiculoTipoCarga.findByPk(req.params.id);
        if (!veiculoTipoCarga) {
            return res.status(404).json({ message: 'VeiculoTipoCarga not found' });
        }
        await veiculoTipoCarga.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};