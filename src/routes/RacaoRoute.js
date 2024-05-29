import racaoController from '../controllers/racaoController';

export default (app) => {
  app.post('/racao/persist', racaoController.persist);
  app.post('/racao/persist/:id', racaoController.persist);
  app.post('/racao/destroy', racaoController.destroy);
  app.get('/racao', racaoController.get);
  app.get('/racao/:id', racaoController.get);
};
