import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ImagemVeiculo from '../models/imagem.caminhao.model';

export const createImagemVeiculo = async (req: Request, res: Response) => {
    try {
        const imgUrl = req.file ? `uploads/${req.file.filename}` : null;
        if (!imgUrl) return res.status(400).json({ message: 'Imagem não enviada.' });

        const imagemVeiculo = await ImagemVeiculo.create({ imgUrl });
        return res.status(201).json(imagemVeiculo);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllImagensVeiculo = async (req: Request, res: Response) => {
    try {
        const imagens = await ImagemVeiculo.findAll();
        return res.status(200).json(imagens);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getImagemVeiculoById = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemVeiculo.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemVeiculo not found' });
        }
        return res.status(200).json(imagem);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateImagemVeiculo = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemVeiculo.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemVeiculo not found' });
        }

        let imgUrl = imagem.imgUrl;

        // Se chegou uma nova imagem, deleta a antiga do disco
        if (req.file) {
            // Remove a barra inicial para evitar problemas de path
            if (imagem.imgUrl) {
                const oldImagePath = path.join(__dirname, '..', '..', imagem.imgUrl.replace(/^\//, ''));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imgUrl = `uploads/${req.file.filename}`;
        }

        await imagem.update({ imgUrl });
        return res.status(200).json(imagem);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteImagemVeiculo = async (req: Request, res: Response) => {
    try {
        const imagem = await ImagemVeiculo.findByPk(req.params.id);
        if (!imagem) {
            return res.status(404).json({ message: 'ImagemVeiculo not found' });
        }

        // Deleta o arquivo do disco se existir
        if (imagem.imgUrl) {
            const imagePath = path.join(__dirname, '..', '..', imagem.imgUrl.replace(/^\//, ''));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
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