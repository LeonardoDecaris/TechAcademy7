import { Request, Response } from 'express';
import sequelize from '../config/database';
import Caminhoneiro from '../models/caminhoneiro.model';
import Veiculo from '../models/veiculo.model';
import VeiculoTipoCarga from '../models\/veiculo_tipoCarga.model';
import ImagemVeiculo from '../models/imagem.caminhao.model';

export const createVeiculo = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.create(req.body);
        return res.status(201).json(veiculo);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllVeiculos = async (req: Request, res: Response) => {
    try {
        const veiculos = await Veiculo.findAll();
        return res.status(200).json(veiculos);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getVeiculoById = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo not found' });
        }
        return res.status(200).json(veiculo);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateVeiculo = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo not found' });
        }
        await veiculo.update(req.body);
        return res.status(200).json(veiculo);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteVeiculo = async (req: Request, res: Response) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo not found' });
        }
        await veiculo.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /usuario/:usuarioId/veiculo
 * Retorna o veículo vinculado ao usuário (caminhoneiro.veiculo_id)
 */
export const getVeiculoByUsuarioId = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  try {
    const cam = await Caminhoneiro.findOne({ where: { usuario_id: usuarioId } });
    if (!cam || !cam.veiculo_id) {
      return res.status(404).json({ message: 'Veículo não vinculado ao usuário' });
    }

    const veic = await Veiculo.findByPk(cam.veiculo_id, {
      include: [{ model: ImagemVeiculo, as: 'imagemVeiculo', required: false }],
    });
    if (!veic) return res.status(404).json({ message: 'Veículo não encontrado' });

    return res.status(200).json(veic);
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: 'Erro ao buscar veículo do usuário', error: err?.message });
  }
};

/**
 * POST /usuario/:usuarioId/veiculo
 * Cria um novo veículo e vincula ao usuário (caminhoneiro). Atômico.
 */
export const createVeiculoByUsuarioId = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  const { marca, modelo, placa, quilometragem, ano, capacidade, imagemVeiculo_id, tipoCargaIds } =
    req.body;

  const t = await sequelize.transaction();
  try {
    // garante caminhoneiro
    let cam = await Caminhoneiro.findOne({ where: { usuario_id: usuarioId }, transaction: t });
    if (!cam) cam = await Caminhoneiro.create({ usuario_id: Number(usuarioId) }, { transaction: t });

    // cria veículo
    const veic = await Veiculo.create(
      { marca, modelo, placa, quilometragem, ano, capacidade, imagemVeiculo_id },
      { transaction: t }
    );
    const veiculoId = veic.id_veiculo ?? (veic as any).id;

    // vincula
    await cam.update({ veiculo_id: veiculoId }, { transaction: t });

    // tipos de carga (opcional)
    if (Array.isArray(tipoCargaIds)) {
      const rows = tipoCargaIds.map((tipoCarga_id: number) => ({ veiculo_id: veiculoId, tipoCarga_id }));
      if (rows.length) await VeiculoTipoCarga.bulkCreate(rows, { transaction: t });
    }

    await t.commit();

    const payload = await Veiculo.findByPk(veiculoId, {
      include: [{ model: ImagemVeiculo, as: 'imagemVeiculo', required: false }],
    });
    return res.status(201).json(payload);
  } catch (err: any) {
    await t.rollback();
    return res.status(500).json({ message: 'Erro ao criar veículo do usuário', error: err?.message });
  }
};

/**
 * PUT /usuario/:usuarioId/veiculo/:id
 * Atualiza o veículo por ID. Valida que o veículo pertence ao usuário.
 */
export const updateVeiculoByUsuarioId = async (req: Request, res: Response) => {
  const { usuarioId, id } = req.params;
  try {
    const cam = await Caminhoneiro.findOne({ where: { usuario_id: usuarioId } });
    if (!cam || !cam.veiculo_id) {
      return res.status(404).json({ message: 'Veículo não vinculado ao usuário' });
    }
    if (Number(cam.veiculo_id) !== Number(id)) {
      return res.status(403).json({ message: 'Veículo não pertence ao usuário' });
    }

    const veic = await Veiculo.findByPk(id);
    if (!veic) return res.status(404).json({ message: 'Veículo não encontrado' });

    await veic.update(req.body);
    return res.status(200).json(veic);
  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao atualizar veículo', error: err?.message });
  }
};

/**
 * DELETE /usuario/:usuarioId/veiculo
 * Desvincula o veículo do usuário (veiculo_id = null).
 * Se ?hard=true, também apaga o registro do veículo.
 */
export const deleteVeiculoByUsuarioId = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;
  const hard = String(req.query.hard || '').toLowerCase() === 'true';

  const t = await sequelize.transaction();
  try {
    const cam = await Caminhoneiro.findOne({ where: { usuario_id: usuarioId }, transaction: t });
    if (!cam || !cam.veiculo_id) {
      await t.rollback();
      return res.status(404).json({ message: 'Veículo não vinculado ao usuário' });
    }

    const veiculoId = cam.veiculo_id;

    // desvincula
    await cam.update({ veiculo_id: null }, { transaction: t });

    // apaga veículo se solicitado
    if (hard) {
      // limpa tipos de carga relacionados
      await VeiculoTipoCarga.destroy({ where: { veiculo_id: veiculoId }, transaction: t });
      const veic = await Veiculo.findByPk(veiculoId, { transaction: t });
      if (veic) await veic.destroy({ transaction: t });
    }

    await t.commit();
    return res.status(204).send();
  } catch (err: any) {
    await t.rollback();
    return res.status(500).json({ message: 'Erro ao excluir/desvincular veículo', error: err?.message });
  }
};
