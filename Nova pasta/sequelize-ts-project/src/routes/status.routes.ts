import { Router } from 'express';
import StatusController from '../controllers/status.controller';

const router = Router();
const statusController = new StatusController();

router.get('/', statusController.getAll.bind(statusController));
router.get('/:id', statusController.getById.bind(statusController));
router.post('/', statusController.create.bind(statusController));
router.put('/:id', statusController.update.bind(statusController));
router.delete('/:id', statusController.delete.bind(statusController));

export default router;