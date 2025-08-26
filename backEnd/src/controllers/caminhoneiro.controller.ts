import { Request, Response } from 'express';
import Caminhoneiro from '../models/caminhoneiro.model';

export const createCaminhoneiro = async (req: Request, res: Response): Promise<Response> => {
    try {
        const caminhoneiro = await Caminhoneiro.create(req.body);
        return res.status(201).json(caminhoneiro);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllCaminhoneiros = async (req: Request, res: Response): Promise<Response> => {
    try {
        const caminhoneiros = await Caminhoneiro.findAll();
        return res.status(200).json(caminhoneiros);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCaminhoneiroById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const caminhoneiro = await Caminhoneiro.findByPk(req.params.id);
        if (caminhoneiro) {
            return res.status(200).json(caminhoneiro);
        }
        return res.status(404).json({ message: 'Caminhoneiro not found' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateCaminhoneiro = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const [updated] = await Caminhoneiro.update(req.body, {
            where: { id_caminhoneiro: req.params.id }
        });
        if (updated) {
            const updatedCaminhoneiro = await Caminhoneiro.findByPk(req.params.id);
            return res.status(200).json(updatedCaminhoneiro);
        }
        return res.status(404).json({ message: 'Caminhoneiro not found' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteCaminhoneiro = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const deleted = await Caminhoneiro.destroy({
            where: { id_caminhoneiro: req.params.id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ message: 'Caminhoneiro not found' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}
