import { Request, Response } from 'express';
import Caminhoneiro from '../models/caminhoneiro.model';
import Usuario from '../models/usuario.model';
import Veiculo from '../models/veiculo.model';
import ImagemVeiculo from '../models/imagem.caminhao.model';
import fs from 'fs';
import path from 'path';

export const createCaminhoneiro = async (req: Request, res: Response): Promise<Response> => {
    try {
        const caminhoneiro = await Caminhoneiro.create(req.body);
        return res.status(201).json(caminhoneiro);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllCaminhoneiros = async (req: Request, res: Response): Promise<Response> => {
    try {
        const caminhoneiros = await Caminhoneiro.findAll();
        return res.status(200).json(caminhoneiros);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const getCaminhoneiroById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const caminhoneiro = await Caminhoneiro.findOne({
            where: { usuario_id: req.params.id },
            include: [
                {
                    model: Veiculo,
                    as: 'veiculo',
                    required: false,
                    include: [{
                        model: ImagemVeiculo,
                        as: 'imagemVeiculo',
                        required: false
                    }]
                },
            ],
        });
        if (caminhoneiro) {
            return res.status(200).json(caminhoneiro);
        }
        return res.status(404).json({ message: 'Caminhoneiro not found' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateCaminhoneiro = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const [updated] = await Caminhoneiro.update(req.body, {
            where: { id_caminhoneiro: req.params.id }
        });
        if (updated) {
            const updatedCaminhoneiro = await Caminhoneiro.findByPk(req.params.id);
            return res.status(200).json(updatedCaminhoneiro);
        }
        return res.status(404).json({ message: 'Caminhoneiro not found' });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteCaminhoneiro = async (req: Request<{ id: string }>, res: Response) => {
    const t = await Caminhoneiro.sequelize?.transaction();
    try {
        const caminhoneiro = await Caminhoneiro.findOne({
            where: { usuario_id: req.params.id },
            transaction: t
        });

        if (!caminhoneiro) {
            await t?.rollback();
            return res.status(404).json({ message: 'Caminhoneiro not found' });
        }

        let veiculo = null as any;
        if (caminhoneiro.veiculo_id) {
            veiculo = await Veiculo.findByPk(caminhoneiro.veiculo_id, { transaction: t });
        }

        if (veiculo?.imagemVeiculo_id) {
            const imagem = await ImagemVeiculo.findByPk(veiculo.imagemVeiculo_id, { transaction: t });
            if (imagem?.imgUrl) {
                const imagePath = path.join(
                    __dirname,
                    '..',
                    '..',
                    imagem.imgUrl.replace(/^[\\/]/, '')
                );
                if (fs.existsSync(imagePath)) {
                    try { fs.unlinkSync(imagePath); } catch {}
                }
            }
            if (imagem) await imagem.destroy({ transaction: t });
        }

        if (veiculo) {
            await veiculo.destroy({ transaction: t });
        }

        await caminhoneiro.destroy({ transaction: t });

        await t?.commit();
        return res.status(204).send();
    } catch (error) {
        await t?.rollback();
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}
