import { Request, Response } from 'express';
import { Empresa } from '../models/empresa.model';

export class EmpresaController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const empresa = await Empresa.create(req.body);
            return res.status(201).json(empresa);
        } catch (error) {
            return res.status(500).json({ message: 'Error creating empresa', error });
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const empresas = await Empresa.findAll();
            return res.status(200).json(empresas);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving empresas', error });
        }
    }

    public async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const empresa = await Empresa.findByPk(req.params.id);
            if (!empresa) {
                return res.status(404).json({ message: 'Empresa not found' });
            }
            return res.status(200).json(empresa);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving empresa', error });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const [updated] = await Empresa.update(req.body, {
                where: { id: req.params.id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Empresa not found' });
            }
            const updatedEmpresa = await Empresa.findByPk(req.params.id);
            return res.status(200).json(updatedEmpresa);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating empresa', error });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const deleted = await Empresa.destroy({
                where: { id: req.params.id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Empresa not found' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting empresa', error });
        }
    }
}