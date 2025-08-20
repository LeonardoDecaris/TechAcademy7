import { Router } from 'express';
import ImagemEmpresaController from '../controllers/imagem_empresa.controller';

const router = Router();
const imagemEmpresaController = new ImagemEmpresaController();

router.post('/', imagemEmpresaController.create);
router.get('/', imagemEmpresaController.findAll);
router.get('/:id', imagemEmpresaController.findOne);
router.put('/:id', imagemEmpresaController.update);
router.delete('/:id', imagemEmpresaController.delete);

export default router;