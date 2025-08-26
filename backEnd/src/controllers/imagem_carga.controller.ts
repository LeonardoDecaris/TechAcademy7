import { Request, Response } from 'express';
import ImagemCarga from '../models/imagem_carga.model';

export const createImagemCarga = async (req: Request, res: Response) => {
    try {
        const imgUrl = req.file ? `/uploads/${req.file.filename}` : null;
        if (!imgUrl) return res.status(400).json({ message: 'Imagem não enviada.' });

        const imagemCarga = await ImagemCarga.create({ imgUrl });
        return res.status(201).json(imagemCarga);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllImagensCarga = async (req: Request, res: Response) => {
    try {
        const imagens = await ImagemCarga.findAll();
        return res.status(200).json(imagens);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getImagemCargaById = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemCarga.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemCarga not found' });
        }
        return res.status(200).json(imagem);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateImagemCarga = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemCarga.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemCarga not found' });
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

export const deleteImagemCarga = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemCarga.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemCarga not found' });
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