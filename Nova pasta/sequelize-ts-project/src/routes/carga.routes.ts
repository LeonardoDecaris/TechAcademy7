import { Router } from 'express';
import CargaController from '../controllers/carga.controller';

const router = Router();
const cargaController = new CargaController();

router.get('/', cargaController.getAll.bind(cargaController));
router.get('/:id', cargaController.getById.bind(cargaController));
router.post('/', cargaController.create.bind(cargaController));
router.put('/:id', cargaController.update.bind(cargaController));
router.delete('/:id', cargaController.delete.bind(cargaController));

export default router;