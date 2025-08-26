import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { createImagemCarga, getAllImagensCarga, getImagemCargaById, updateImagemCarga, deleteImagemCarga } from '../controllers/imagem_carga.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/imgCarga', authMiddleware, upload.single('imagem'), createImagemCarga);
router.get('/imgCarga', authMiddleware, getAllImagensCarga);
router.get('/imgCarga/:id', authMiddleware, getImagemCargaById);
router.put('/imgCarga/:id', authMiddleware, upload.single('imagem'), updateImagemCarga);
router.delete('/imgCarga/:id', authMiddleware, deleteImagemCarga);

export default router;