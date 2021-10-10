import IRoute from 'app/modules/@Types/route.interface';
import Profile from 'app/Initials/auth/Profile';
import Statistics from 'app/modules/auth/Profile/Account';
import Contacts from 'app/modules/auth/Profile/Contacts';
import PersonalInfos from 'app/modules/auth/Profile/PersonalInfos';
import AddDetailsProperty from 'app/Initials/auth/AddDetailsProperty';
import AddImagesProperty from 'app/Initials/auth/AddImagesProperty';
import AddAddresseProperty from 'app/Initials/auth/AddAddresseProperty';

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
    name: 'Esika - Ajouter',
    secured: true,
    path: '/:username/ajouter/details',
    exact: true,
    component: AddDetailsProperty,
  },
  {
    name: 'Esika - Ajouter',
    secured: true,
    path: '/:username/ajouter/adresse',
    exact: true,
    component: AddAddresseProperty,
  },
  {
    name: 'Esika - Ajouter',
    secured: true,
    path: '/:username/ajouter/images',
    exact: true,
    component: AddImagesProperty,
  },
];

export default authRoutes;
