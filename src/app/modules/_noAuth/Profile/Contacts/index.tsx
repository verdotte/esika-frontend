import ProfileProvider from 'app/modules/Contexts/ProfileContext';
import ContactsPage from './ContactsPage';

const Contacts = () => {
  return (
    <ProfileProvider>
      <ContactsPage />
    </ProfileProvider>
  );
};

export default Contacts;
