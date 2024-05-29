// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import usuarioController from '../controllers/usuarioController';
import verifyPermission from '../middleware/verifyPermission';
import verifyToken from '../middleware/verifyToken';

export default (app) => {
  app.post('/usuario/persist', usuarioController.persist);
  app.post('/usuario/persist/:id', usuarioController.persist);
  app.post('/usuario/destroy', usuarioController.destroy);
  app.post('/usuario/register', usuarioController.register);
  app.post('/usuario/login', usuarioController.login);
  app.get('/usuario', usuarioController.get);
  app.get('/usuario/:id', usuarioController.get);
};
