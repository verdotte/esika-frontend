import IRoute from 'app/modules/@Types/route.interface';
import noAuthRoutes from './noAuth.routes';

const appRoutes: IRoute[] = [...noAuthRoutes];

export default appRoutes;
