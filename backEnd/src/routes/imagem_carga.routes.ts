import { Router } from 'express';
import { createImagemCarga, getAllImagensCarga, getImagemCargaById, updateImagemCarga, deleteImagemCarga } from '../controllers/imagem_carga.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadSingleImage } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/imgCarga', authMiddleware, uploadSingleImage('imgUrl'), createImagemCarga);
router.get('/imgCarga', authMiddleware, getAllImagensCarga);
router.get('/imgCarga/:id', authMiddleware, getImagemCargaById);
router.put('/imgCarga/:id', authMiddleware, uploadSingleImage('imgUrl'), updateImagemCarga);
router.delete('/imgCarga/:id', authMiddleware, deleteImagemCarga);

export default router;