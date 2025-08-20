import { Router } from 'express';
import CaminhoneiroController from '../controllers/caminhoneiro.controller';

const router = Router();
const caminhoneiroController = new CaminhoneiroController();

router.get('/', caminhoneiroController.getAll.bind(caminhoneiroController));
router.get('/:id', caminhoneiroController.getById.bind(caminhoneiroController));
router.post('/', caminhoneiroController.create.bind(caminhoneiroController));
router.put('/:id', caminhoneiroController.update.bind(caminhoneiroController));
router.delete('/:id', caminhoneiroController.delete.bind(caminhoneiroController));

export default router;