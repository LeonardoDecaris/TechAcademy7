import { Router } from 'express';
import EmpresaController from '../controllers/empresa.controller';

const router = Router();
const empresaController = new EmpresaController();

router.post('/', empresaController.create);
router.get('/', empresaController.findAll);
router.get('/:id', empresaController.findOne);
router.put('/:id', empresaController.update);
router.delete('/:id', empresaController.delete);

export default router;