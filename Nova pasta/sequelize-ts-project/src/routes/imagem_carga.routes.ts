import { Router } from 'express';
import ImagemCargaController from '../controllers/imagem_carga.controller';

const router = Router();
const imagemCargaController = new ImagemCargaController();

router.post('/', imagemCargaController.create);
router.get('/', imagemCargaController.findAll);
router.get('/:id', imagemCargaController.findOne);
router.put('/:id', imagemCargaController.update);
router.delete('/:id', imagemCargaController.delete);

export default router;