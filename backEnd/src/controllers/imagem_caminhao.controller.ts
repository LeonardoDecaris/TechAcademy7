import { Request, Response } from 'express';
import ImagemVeiculo from '../models/imagem_carga.model';
import multer from 'multer';
import path from 'path';

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
export const upload = multer({ storage });

export const createImagemVeiculo = async (req: Request, res: Response) => {
  try {
    const img_url = req.file ? `/uploads/${req.file.filename}` : null;
    if (!img_url) return res.status(400).json({ message: 'Imagem não enviada.' });

    const imagemVeiculo = await ImagemVeiculo.create({ img_url });
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