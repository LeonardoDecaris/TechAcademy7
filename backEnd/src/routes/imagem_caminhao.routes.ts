import { Router } from 'express';
import { createImagemVeiculo, getAllImagensVeiculo, getImagemVeiculoById, updateImagemVeiculo, deleteImagemVeiculo } from '../controllers/imagem_caminhao.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadSingleImage } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/imgCaminhao', uploadSingleImage('imgUrl'), createImagemVeiculo);
router.get('/imgCaminhao', authMiddleware, getAllImagensVeiculo);
router.get('/imgCaminhao/:id', authMiddleware, getImagemVeiculoById);
router.put('/imgCaminhao/:id', authMiddleware, uploadSingleImage('imgUrl'), updateImagemVeiculo);
router.delete('/imgCaminhao/:id', authMiddleware, deleteImagemVeiculo);

export default router;