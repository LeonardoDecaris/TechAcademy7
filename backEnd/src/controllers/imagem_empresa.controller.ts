import { Request, Response } from 'express';
import ImagemEmpresa from '../models/imagem_empresa.model';

export const createImagemEmpresa = async (req: Request, res: Response) => {
    try {
        const imgUrl = req.file ? `/uploads/${req.file.filename}` : null;
        if (!imgUrl) return res.status(400).json({ message: 'Imagem não enviada.' });

        const imagemEmpresa = await ImagemEmpresa.create({ imgUrl });
        return res.status(201).json(imagemEmpresa);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllImagensEmpresa = async (req: Request, res: Response) => {
    try {
        const imagens = await ImagemEmpresa.findAll();
        return res.status(200).json(imagens);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getImagemEmpresaById = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemEmpresa.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemEmpresa not found' });
        }
        return res.status(200).json(imagem);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateImagemEmpresa = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemEmpresa.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemEmpresa not found' });
        }
        const imgUrl = req.file ? `/uploads/${req.file.filename}` : imagem.imgUrl;
        await imagem.update({ imgUrl });
        return res.status(200).json(imagem);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteImagemEmpresa = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemEmpresa.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemEmpresa not found' });
        }
        await imagem.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};