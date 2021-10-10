import IRoute from 'app/modules/@Types/route.interface';
import Profile from 'app/Initials/__secured/Profile';
import Statistics from 'app/modules/_secured/Profile/Account';
import Contacts from 'app/modules/_secured/Profile/Contacts';
import PersonalInfos from 'app/modules/_secured/Profile/PersonalInfos';
import AgentProperties from 'app/Initials/__secured/AgentProperties';

const authRoutes: IRoute[] = [
  {
    name: 'Esika - Profile',
    secured: true,
    path: '/profile',
    exact: true,
    component: Profile,
  },
  {
    name: 'Esika - Infos',
    secured: true,
    path: '/profile/infos',
    exact: true,
    component: PersonalInfos,
  },
  {
    name: 'Esika - Statistics',
    secured: true,
    path: '/profile/compte',
    exact: true,
    component: Statistics,
  },
  {
    name: 'Esika - Contacts',
    secured: true,
    path: '/profile/contacts',
    exact: true,
    component: Contacts,
  },
  {
    name: 'Esika - Mes immobiliers',
    secured: true,
    path: '/profile/properties',
    exact: true,
    isRestricted: true,
    component: AgentProperties,
  },
];

export default authRoutes;
