import { Router } from 'express';
import { createCaminhoneiro, deleteCaminhoneiro, getAll, getById, updatedCaminhoneiro } from '../controllers/caminhoneiro.controller';
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router();
router.get("/caminhoneiro", getAll);
router.get("/caminhoneiro/:id", getById);
router.post("/caminhoneiro", authMiddleware, createCaminhoneiro);
router.put("/caminhoneiro/:id", authMiddleware, updatedCaminhoneiro);
router.delete("/caminhoneiro/:id", authMiddleware, deleteCaminhoneiro);

export default router;