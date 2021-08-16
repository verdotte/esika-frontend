import Property from 'app/Initials/__noAuth/Property';
import Home from 'app/Initials/__noAuth/Home';
import Login from 'app/Initials/__noAuth/Login';
import Register from 'app/Initials/__noAuth/Register';
import VerifyCode from 'app/Initials/__noAuth/Verify';
import IRoute from 'app/modules/@Types/route.interface';

const noAuthRoutes: IRoute[] = [
  {
    name: 'Esika - Home',
    secured: false,
    path: '/',
    exact: true,
    component: Home,
  },
  {
    name: 'Esika - Connectez votre compte',
    secured: false,
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    name: 'Esika - Creer votre compte',
    secured: false,
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    name: 'Esika - Verifier votre numero de telephone',
    secured: false,
    path: '/verify',
    exact: true,
    component: VerifyCode,
  },
  {
    name: 'Esika - Propriété',
    secured: false,
    path: '/property/:slug',
    exact: true,
    component: Property,
  },
  {
    name: 'Esika - Propriété',
    secured: false,
    path: '/profile',
    exact: true,
    component: Property,
  },
];

export default noAuthRoutes;
