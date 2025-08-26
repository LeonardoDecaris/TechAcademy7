import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createImagemVeiculo, getAllImagensVeiculo, getImagemVeiculoById, updateImagemVeiculo, deleteImagemVeiculo } from '../controllers/imagem_caminhao.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/imgCaminhao', authMiddleware, upload.single('imagem'), createImagemVeiculo);
router.get('/imgCaminhao', authMiddleware, getAllImagensVeiculo);
router.get('/imgCaminhao/:id', authMiddleware, getImagemVeiculoById);
router.put('/imgCaminhao/:id', authMiddleware, upload.single('imagem'), updateImagemVeiculo);
router.delete('/imgCaminhao/:id', authMiddleware, deleteImagemVeiculo);

export default router;