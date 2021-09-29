import IRoute from 'app/modules/@Types/route.interface';
import AuthRoutes from './auth.routes';
import noAuthRoutes from './noAuth.routes';

const appRoutes: IRoute[] = [...AuthRoutes, ...noAuthRoutes];

export default appRoutes;
