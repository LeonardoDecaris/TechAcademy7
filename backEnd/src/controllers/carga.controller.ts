import { Request, Response } from 'express';
import Carga from '../models/carga.model';

export const createCarga = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carga = await Carga.create(req.body);
        return res.status(201).json(carga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllCargas = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cargas = await Carga.findAll();
        return res.status(200).json(cargas);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCargaById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const carga = await Carga.findByPk(req.params.id);
        if (!carga) {
            return res.status(404).json({ message: 'Carga not found' });
        }
        return res.status(200).json(carga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCarga = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const carga = await Carga.findByPk(req.params.id);
        if (!carga) {
            return res.status(404).json({ message: 'Carga not found' });
        }
        await carga.update(req.body);
        return res.status(200).json(carga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCarga = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const carga = await Carga.findByPk(req.params.id);
        if (!carga) {
            return res.status(404).json({ message: 'Carga not found' });
        }
        await carga.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};