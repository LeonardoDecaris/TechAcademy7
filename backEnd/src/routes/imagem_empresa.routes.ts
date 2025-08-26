import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createImagemEmpresa, getAllImagensEmpresa, getImagemEmpresaById, updateImagemEmpresa, deleteImagemEmpresa } from '../controllers/imagem_empresa.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/imgEmpresa', authMiddleware, upload.single('imagem'), createImagemEmpresa);
router.get('/imgEmpresa', authMiddleware, getAllImagensEmpresa);
router.get('/imgEmpresa/:id', authMiddleware, getImagemEmpresaById);
router.put('/imgEmpresa/:id', authMiddleware, upload.single('imagem'), updateImagemEmpresa);
router.delete('/imgEmpresa/:id', authMiddleware, deleteImagemEmpresa);

export default router;