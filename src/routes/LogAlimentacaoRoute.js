import LogAlimentacaoController from '../controllers/logAlimentacaoController';

export default (app) => {
  app.post('/logAlimentacao/persist', LogAlimentacaoController.persist);
  app.post('/logAlimentacao/persist/:id', LogAlimentacaoController.persist);
  app.post('/logAlimentacao/destroy', LogAlimentacaoController.destroy);
  app.get('/logAlimentacao', LogAlimentacaoController.get);
  app.get('/logAlimentacao/:id', LogAlimentacaoController.get);
};
