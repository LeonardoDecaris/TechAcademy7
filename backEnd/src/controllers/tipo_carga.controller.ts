import { Request, Response } from 'express';
import TipoCarga from '../models/tipo_carga.model';

export const createTipoCarga = async (req: Request, res: Response) => {
    try {
        const tipoCarga = await TipoCarga.create(req.body);
        return res.status(201).json(tipoCarga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllTipoCarga = async (req: Request, res: Response) => {
    try {
        const tipoCargaList = await TipoCarga.findAll();
        return res.status(200).json(tipoCargaList);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTipoCargaById = async (req: Request, res: Response) => {
    try {
        const tipoCarga = await TipoCarga.findByPk(req.params.id);
        if (!tipoCarga) {
            return res.status(404).json({ message: 'TipoCarga not found' });
        }
        return res.status(200).json(tipoCarga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateTipoCarga = async (req: Request, res: Response) => {
    try {
        const tipoCarga = await TipoCarga.findByPk(req.params.id);
        if (!tipoCarga) {
            return res.status(404).json({ message: 'TipoCarga not found' });
        }
        await tipoCarga.update(req.body);
        return res.status(200).json(tipoCarga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteTipoCarga = async (req: Request, res: Response) => {
    try {
        const tipoCarga = await TipoCarga.findByPk(req.params.id);
        if (!tipoCarga) {
            return res.status(404).json({ message: 'TipoCarga not found' });
        }
        await tipoCarga.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};