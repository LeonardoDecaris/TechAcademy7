import { Router } from 'express';
import VeiculoController from '../controllers/veiculo.controller';

const router = Router();
const veiculoController = new VeiculoController();

router.get('/', veiculoController.getAll);
router.get('/:id', veiculoController.getById);
router.post('/', veiculoController.create);
router.put('/:id', veiculoController.update);
router.delete('/:id', veiculoController.delete);

export default router;