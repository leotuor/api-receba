import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Usuario.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Usuario.findOne({ where: { id } });

    if (!response) {
      return res.status(400).send({
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
    return res.status(500).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const create = async (dados, res) => {
  const {
    nome,
    login,
    passwordHash,
    email,
    idCargo,
    profileImage,
  } = dados;

  const response = await Usuario.create({
    nome,
    email,
    login,
    passwordHash,
    idCargo,
    profileImage,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await Usuario.findOne({ where: { id } });

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
    return res.status(500).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
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

    const response = await Usuario.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
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
    return res.status(500).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

// eslint-disable-next-line consistent-return
const register = async (req, res) => {
  try {
    const {
      nome, login, password, email, idCargo, profileImage,
    } = req.body;
    const response = await Usuario.findOne({
      where: {
        login: email,
      },
    });
    if (response) {
      throw new Error('Username já foi utilizado!');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const resposta = await Usuario.create({
      nome,
      email,
      passwordHash,
      login,
      idCargo,
      profileImage,
    });
    return res.status(201).send({
      message: 'registro criado com sucesso',
      data: resposta,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // eslint-disable-next-line no-shadow
    const { login, password } = req.body;
    const user = await Usuario.findOne({
      where: {
        email: login,
      },
    });
    if (!user) {
      throw new Error('Usuario ou senha invalidos!');
    }
    // eslint-disable-next-line prefer-destructuring
    const passwordHash = user.dataValues.passwordHash;
    const resposta = await bcrypt.compare(password, passwordHash);
    if (resposta) {
      const token = jwt.sign(
        {
          userId: user.dataValues.id,
          userName: user.dataValues.nome,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );
      return res.status(200).send({
        token,
      });
    }
    return res.status(400).send({
      message: 'Usuario ou senha invalidos!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  register,
  login,
  update,
};
