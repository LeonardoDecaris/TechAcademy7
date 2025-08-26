import { Router } from 'express';
import { createImagemEmpresa, getAllImagensEmpresa, getImagemEmpresaById, updateImagemEmpresa, deleteImagemEmpresa } from '../controllers/imagem_empresa.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadSingleImage } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/imgEmpresa', authMiddleware, uploadSingleImage('imgUrl'), createImagemEmpresa);
router.get('/imgEmpresa', authMiddleware, getAllImagensEmpresa);
router.get('/imgEmpresa/:id', authMiddleware, getImagemEmpresaById);
router.put('/imgEmpresa/:id', authMiddleware, uploadSingleImage('imgUrl'), updateImagemEmpresa);
router.delete('/imgEmpresa/:id', authMiddleware, deleteImagemEmpresa);

export default router;