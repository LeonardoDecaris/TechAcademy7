import { Router } from 'express';
import ImagemUsuarioController from '../controllers/imagem_usuario.controller';

const router = Router();
const imagemUsuarioController = new ImagemUsuarioController();

router.post('/', imagemUsuarioController.create);
router.get('/', imagemUsuarioController.findAll);
router.get('/:id', imagemUsuarioController.findOne);
router.put('/:id', imagemUsuarioController.update);
router.delete('/:id', imagemUsuarioController.delete);

export default router;