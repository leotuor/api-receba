import cargoController from '../controllers/cargoController';
import verifyToken from '../middleware/verifyToken';

export default (app) => {
  app.post('/cargo/persist', cargoController.persist);
  app.post('/cargo/persist/:id', cargoController.persist);
  app.post('/cargo/destroy', cargoController.destroy);
  app.get('/cargo', cargoController.get);
  app.get('/cargo/:id', cargoController.get);
};
