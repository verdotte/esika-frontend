import NotFound from 'app/Initials/__noAuth/NotFound';
import IRoute from 'app/modules/@Types/route.interface';
import noAuthRoutes from './noAuth.routes';

const notFoundRoute = {
  name: 'Esika - 404 Page',
  secured: false,
  path: '*',
  exact: true,
  component: NotFound,
};

const appRoutes: IRoute[] = [...noAuthRoutes, notFoundRoute];

export default appRoutes;
