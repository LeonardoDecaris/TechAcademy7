import { Request, Response } from 'express';
import { ImagemCarga } from '../models/imagem_carga.model';

export class ImagemCargaController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const imagemCarga = await ImagemCarga.create(req.body);
            return res.status(201).json(imagemCarga);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const imagensCarga = await ImagemCarga.findAll();
            return res.status(200).json(imagensCarga);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const imagemCarga = await ImagemCarga.findByPk(req.params.id);
            if (!imagemCarga) {
                return res.status(404).json({ message: 'ImagemCarga not found' });
            }
            return res.status(200).json(imagemCarga);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await ImagemCarga.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'ImagemCarga not found' });
            }
            const updatedImagemCarga = await ImagemCarga.findByPk(req.params.id);
            return res.status(200).json(updatedImagemCarga);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await ImagemCarga.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'ImagemCarga not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}