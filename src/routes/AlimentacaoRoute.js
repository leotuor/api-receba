// eslint-disable-next-line import/no-unresolved, import/extensions
import alimentacaoController from '../controllers/alimentacaoController';

export default (app) => {
  app.post('/alimentacao/persist', alimentacaoController.persist);
  app.post('/alimentacao/persist/:id', alimentacaoController.persist);
  app.post('/alimentacao/destroy', alimentacaoController.destroy);
  app.get('/alimentacao', alimentacaoController.get);
  app.get('/alimentacao/:id', alimentacaoController.get);
};
