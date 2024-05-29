import habitatController from '../controllers/habitatController';

export default (app) => {
  app.post('/habitat/persist', habitatController.persist);
  app.post('/habitat/persist/:id', habitatController.persist);
  app.post('/habitat/destroy', habitatController.destroy);
  app.get('/habitat', habitatController.get);
  app.get('/habitat/capacidade/:id', habitatController.capacity);
  app.get('/habitat/alimentacao/:id', habitatController.diaAlimentacao);
  app.get('/habitat/:id', habitatController.get);
};
