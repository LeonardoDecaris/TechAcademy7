import { Request, Response } from 'express';
import ImagemVeiculo from '../models/imagem_carga.model';
import multer from 'multer';
import path from 'path';


export const createImagemVeiculo = async (req: Request, res: Response) => {
  try {
    const imgUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!imgUrl) return res.status(400).json({ message: 'Imagem não enviada.' });

    const imagemVeiculo = await ImagemVeiculo.create({ imgUrl });
    return res.status(201).json(imagemVeiculo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllImagensVeiculo = async (req: Request, res: Response) => {
  try {
    const imagens = await ImagemVeiculo.findAll();
    return res.json(imagens);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getImagemVeiculoById = async (req: Request, res: Response) => {
  // Implementar lógica para obter imagem por ID
};

export const updateImagemVeiculo = async (req: Request, res: Response) => {
  // Implementar lógica para atualizar imagem
};

export const deleteImagemVeiculo = async (req: Request, res: Response) => {
  // Implementar lógica para deletar imagem
};