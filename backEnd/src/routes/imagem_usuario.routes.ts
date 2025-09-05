import { Router } from 'express';
import { createImagemUsuario, getAllImagensUsuario, getImagemUsuarioById, updateImagemUsuario, deleteImagemUsuario } from '../controllers/imagem_usuario.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadSingleImage } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/imgUsuario', uploadSingleImage('imgUrl'), createImagemUsuario);
router.get('/imgUsuario', authMiddleware, getAllImagensUsuario);
router.get('/imgUsuario/:id', authMiddleware, getImagemUsuarioById);
router.put('/imgUsuario/:id', uploadSingleImage('imgUrl'), updateImagemUsuario);
router.delete('/imgUsuario/:id', deleteImagemUsuario);

export default router;