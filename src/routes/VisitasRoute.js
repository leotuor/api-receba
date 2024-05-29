import visitasController from '../controllers/visitasController';

export default (app) => {
  app.post('/visitas/persist', visitasController.persist);
  app.post('/visitas/persist/:id', visitasController.persist);
  app.post('/visitas/destroy', visitasController.destroy);
  app.get('/visitas', visitasController.get);
  app.get('/visitas/:id', visitasController.get);
};
