import { Request, Response } from 'express';
import Status from '../models/status.model';

export const createStatus = async (req: Request, res: Response) => {
    try {
        const status = await Status.create(req.body);
        return res.status(201).json(status);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllStatus = async (req: Request, res: Response) => {
    try {
        const statusList = await Status.findAll();
        return res.status(200).json(statusList);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getStatusById = async (req: Request, res: Response) => {
    try {
        const status = await Status.findByPk(req.params.id);
        if (!status) {
            return res.status(404).json({ message: 'Status not found' });
        }
        return res.status(200).json(status);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const status = await Status.findByPk(req.params.id);
        if (!status) {
            return res.status(404).json({ message: 'Status not found' });
        }
        await status.update(req.body);
        return res.status(200).json(status);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteStatus = async (req: Request, res: Response) => {
    try {
        const status = await Status.findByPk(req.params.id);
        if (!status) {
            return res.status(404).json({ message: 'Status not found' });
        }
        await status.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};