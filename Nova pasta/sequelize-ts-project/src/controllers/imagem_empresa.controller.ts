import { Request, Response } from 'express';
import { ImagemEmpresa } from '../models/imagem_empresa.model';

export class ImagemEmpresaController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const imagemEmpresa = await ImagemEmpresa.create(req.body);
            return res.status(201).json(imagemEmpresa);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const imagens = await ImagemEmpresa.findAll();
            return res.status(200).json(imagens);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const imagem = await ImagemEmpresa.findByPk(req.params.id);
            if (!imagem) {
                return res.status(404).json({ message: 'Imagem not found' });
            }
            return res.status(200).json(imagem);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await ImagemEmpresa.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Imagem not found' });
            }
            const updatedImagem = await ImagemEmpresa.findByPk(req.params.id);
            return res.status(200).json(updatedImagem);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await ImagemEmpresa.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Imagem not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}