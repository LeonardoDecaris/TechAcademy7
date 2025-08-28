import { Request, Response } from 'express';
import Empresa from '../models/empresa.model';

export const createEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.create(req.body);
        return res.status(201).json(empresa);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllEmpresas = async (req: Request, res: Response) => {
    try {
        const empresas = await Empresa.findAll();
        return res.status(200).json(empresas);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getEmpresaById = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa not found' });
        }
        return res.status(200).json(empresa);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa not found' });
        }
        await empresa.update(req.body);
        return res.status(200).json(empresa);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteEmpresa = async (req: Request, res: Response) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa not found' });
        }
        await empresa.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};