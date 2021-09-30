import IRoute from 'app/modules/@Types/route.interface';
import Profile from 'app/Initials/auth/Profile';
import Statistics from 'app/modules/auth/Profile/Account';
import Contacts from 'app/modules/auth/Profile/Contacts';
import PersonalInfos from 'app/modules/auth/Profile/PersonalInfos';

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
];

export default authRoutes;
