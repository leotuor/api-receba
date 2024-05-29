/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
import Habitat from '../models/HabitatModel';
import { sequelize } from '../config/config';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Habitat.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Habitat.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const create = async (dados, res) => {
  const {
    tipo, lotacaoMax, quantidadeAnimais, numero, idVisitas,
  } = dados;

  const response = await Habitat.create({
    tipo,
    lotacaoMax,
    quantidadeAnimais,
    numero,
    idVisitas,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await Habitat.findOne({ where: { id } });

  if (!response) {
    return res.status(400).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => response[field] = dados[field]);

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(400).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.body.id ? req.body.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await Habitat.findOne({ where: { id } });

    if (!response) {
      return res.status(400).send({
        type: 'error',
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro id ${id} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(400).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const capacity = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Habitat.findOne({
      where: { id },
      attributes: ['quantidadeAnimais', 'lotacaoMax'],
    });
    if (response) {
      return res.status(200).send({
        type: 'success',
        message: `O Habitat está ${(response.quantidadeAnimais / response.lotacaoMax * 100).toFixed(2)}% da capacidade total!`,
        data: response,
      });
    }
    if (!response) {
      return res.status(400).send({
        type: 'error',
        message: 'Nenhum registro de habitat',
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-undef
    return res.status(400).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

// eslint-disable-next-line consistent-return
const diaAlimentacao = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await sequelize.query(
      `
  SELECT habitat.id, usuario.id
  FROM habitat
  INNER JOIN animal
        ON habitat.id = animal.id_habitat
  INNER JOIN alimentacao
        ON animal.id_alimentacao = alimentacao.id
  inner join usuario
      on alimentacao.id_usuario = usuario.id
  where habitat.id = ${id};
  `,
    ).then((a) => a[0]);
    if (!response) {
      return res.status(400).send({
        type: 'success',
        message: 'Cadastro vazio!',
        data: response,
      });
    }
    if (response) {
      return res.status(200).send({
        type: 'success',
        message: `A alimentação deste habitat foi feita pelo usuario de id ${response[0].id}!`,
        data: response,
      });
    }
  } catch (error) {
    return res.status(400).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  update,
  capacity,
  diaAlimentacao,
};
