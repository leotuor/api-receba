import jwt from 'jsonwebtoken';
import Usuario from '../models/UsuarioModel';

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

    if (!decodedToken) {
      return res.status(401).send({
        message: 'Não Autorizado',
      });
    }

    if (decodedToken.exp < (Date.now() / 1000)) {
      return res.status(401).send({
        message: 'Token expirado, faça login!',
      });
    }
    const usuario = await Usuario.findOne({
      where: {
        id: decodedToken.userId,
      },
    });
    if (!usuario) {
      return res.status(401).send({
        message: 'Conta incorreta',
      });
    }

    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Access denied!',
    });
  }
};
