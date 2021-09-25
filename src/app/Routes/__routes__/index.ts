import NotFound from 'app/Initials/__noAuth/NotFound';
import IRoute from 'app/modules/@Types/route.interface';
import noAuthRoutes from './noAuth.routes';
import authRoutes from './auth.routes';

const notFoundRoute: IRoute = {
  name: 'Esika - 404 Page',
  secured: false,
  path: '*',
  exact: true,
  component: NotFound,
};

const appRoutes: IRoute[] = [
  ...authRoutes,
  ...noAuthRoutes,
  notFoundRoute,
];

export default appRoutes;
