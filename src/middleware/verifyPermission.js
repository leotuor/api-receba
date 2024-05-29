import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel';
import Cargo from '../models/CargoModel';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const token = req.headers.authorization || null;
    // eslint-disable-next-line eqeqeq
    if (!token || token == 'Bearer') {
      return res.status(401).send({
        message: 'Access denied!',
      });
    }
    const [_, tokenLimpo] = token.split(' ');

    const decodedToken = jwt.decode(tokenLimpo);

    const usuario = await Usuario.findOne({
      where: {
        id: decodedToken.userId,
      },
      include: [{
        model: Cargo,
        as: 'cargo',
        required: true,
        attributes: ['nome'],
      }],
    });
    if (usuario.cargo.nome !== 'admin') {
      return res.status(401).send({
        message: 'Acesso negado, Permissão não encontrada',
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      message: error.message,
    });
  }
};
