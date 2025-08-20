import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller';

const router = Router();
const usuarioController = new UsuarioController();

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);

export default router;