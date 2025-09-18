import { Request, Response } from 'express';
import Frete from '../models/frete.model';
import Carga from '../models/carga.model';
import ImagemCarga from '../models/imagem_carga.model';
import Status from '../models/status.model';
import Caminhoneiro from '../models/caminhoneiro.model';
import Empresa from '../models/empresa.model';
import ImagemEmpresa from '../models/imagem_empresa.model';
import TipoCarga from '../models/tipo_carga.model';

export const createFrete = async (req: Request, res: Response) => {
    try {
        const frete = await Frete.create(req.body);
        return res.status(201).json(frete);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllFretes = async (req: Request, res: Response) => {
    try {
        const fretes = await Frete.findAll({
            include: [
                {
                model: Carga,
                as: 'carga',
                required: false,
                include: [{
                    model: ImagemCarga,
                    as: 'imagemCarga',
                    required: false
                },
                {
                    model: TipoCarga,
                    as: 'tipoCarga',
                    required: false
                }]
            },
            {
                model: Status,
                as: 'status',
                required: false 
            },
            {
              model: Caminhoneiro,
              as: 'caminhoneiro',
              required: false  
            },
            {
                model: Empresa,
                as: 'empresa',
                required: false,
                include: [{
                    model: ImagemEmpresa,
                    as: 'imagemEmpresa',
                    required: false
                }]
            }
        ]
        });
        return res.status(200).json(fretes);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFretesByCaminhoneiro = async (req: Request, res: Response) => {
    try {
        const { caminhoneiroId } = req.params;
        const frete = await Frete.findOne({
            where: { caminhoneiro_id: caminhoneiroId },
            include: [
                {
                    model: Carga,
                    as: 'carga',
                    required: false,
                    include: [{
                        model: ImagemCarga,
                        as: 'imagemCarga',
                        required: false
                    },
                    {
                        model: TipoCarga,
                        as: 'tipoCarga',
                        required: false
                    }]
                },
                {
                    model: Status,
                    as: 'status',
                    required: false
                },
                {
                  model: Caminhoneiro,
                  as: 'caminhoneiro',
                  required: false
                },
                {
                    model: Empresa,
                    as: 'empresa',
                    required: false,
                    include: [{
                        model: ImagemEmpresa,
                        as: 'imagemEmpresa',
                        required: false
                    }]
                }
            ]
        });
        return res.status(200).json(frete);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFreteById = async (req: Request, res: Response) => {
    try {
        const frete = await Frete.findByPk(req.params.id);
        if (!frete) {
            return res.status(404).json({ message: 'Frete not found' });
        }
        return res.status(200).json(frete);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateFrete = async (req: Request, res: Response) => {
    try {
        const frete = await Frete.findByPk(req.params.id);
        if (!frete) {
            return res.status(404).json({ message: 'Frete not found' });
        }
        await frete.update(req.body);
        return res.status(200).json(frete);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteFrete = async (req: Request, res: Response) => {
    try {
        const frete = await Frete.findByPk(req.params.id);
        if (!frete) {
            return res.status(404).json({ message: 'Frete not found' });
        }
        await frete.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};