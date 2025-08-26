import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createImagemUsuario, getAllImagensUsuario, getImagemUsuarioById, updateImagemUsuario, deleteImagemUsuario } from '../controllers/imagem_usuario.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/imgUsuario', authMiddleware, upload.single('imagem'), createImagemUsuario);
router.get('/imgUsuario', authMiddleware, getAllImagensUsuario);
router.get('/imgUsuario/:id', authMiddleware, getImagemUsuarioById);
router.put('/imgUsuario/:id', authMiddleware, upload.single('imagem'), updateImagemUsuario);
router.delete('/imgUsuario/:id', authMiddleware, deleteImagemUsuario);

export default router;