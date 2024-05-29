import AlimentacaoRoute from './AlimentacaoRoute';
import AnimalRoute from './AnimalRoute';
import CargoRoute from './CargoRoute';
import HabitatRoute from './HabitatRoute';
import LogAlimentacaoRoute from './LogAlimentacaoRoute';
import RacaoRoute from './RacaoRoute';
import UsuarioRoute from './UsuarioRoute';
import VisitasRoute from './VisitasRoute';

function Routes(app) {
  CargoRoute(app);
  UsuarioRoute(app);
  AlimentacaoRoute(app);
  AnimalRoute(app);
  HabitatRoute(app);
  LogAlimentacaoRoute(app);
  RacaoRoute(app);
  VisitasRoute(app);
}

export default Routes;
