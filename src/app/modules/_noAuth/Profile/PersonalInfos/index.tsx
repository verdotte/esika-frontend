import ProfileProvider from 'app/modules/Contexts/ProfileContext';
import PersonalInfosPage from './PersonalInfosPage';

const PersonalInfos = () => {
  return (
    <ProfileProvider>
      <PersonalInfosPage />
    </ProfileProvider>
  );
};

export default PersonalInfos;
