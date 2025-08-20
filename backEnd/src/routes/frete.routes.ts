import { Router } from 'express';
import FreteController from '../controllers/frete.controller';

const router = Router();
const freteController = new FreteController();

router.get('/', freteController.getAll.bind(freteController));
router.get('/:id', freteController.getById.bind(freteController));
router.post('/', freteController.create.bind(freteController));
router.put('/:id', freteController.update.bind(freteController));
router.delete('/:id', freteController.delete.bind(freteController));

export default router;