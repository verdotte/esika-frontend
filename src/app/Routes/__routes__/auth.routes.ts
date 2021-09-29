import IRoute from 'app/modules/@Types/route.interface';
import Statistics from 'app/modules/_noAuth/Profile/Account';
import AgentProperties from 'app/modules/_noAuth/Profile/Statistics';

const AuthRoutes: IRoute[] = [
  {
    name: 'Esika - Statistics',
    secured: true,
    path: '/profile/compte',
    exact: true,
    component: Statistics,
  },
  {
    name: 'Esika - Statistics',
    secured: true,
    path: '/profile/statistique',
    exact: true,
    component: AgentProperties,
  },
];

export default AuthRoutes;
