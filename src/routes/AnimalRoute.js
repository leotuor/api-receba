import animalController from '../controllers/animalController';

export default (app) => {
  app.post('/animal/persist', animalController.persist);
  app.post('/animal/persist/:id', animalController.persist);
  app.post('/animal/destroy', animalController.destroy);
  app.get('/animal', animalController.get);
  app.get('/animal/:id', animalController.get);
};
