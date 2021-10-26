import React, { ReactNode } from 'react';
import HomeProvider from 'app/modules/Contexts/HomeContext';
import ProfileProvider from 'app/modules/Contexts/ProfileContext';
import AddPropertyProvider from 'app/modules/Contexts/AddPropertyContext';

interface Props {
  children: ReactNode;
}

const AppProviders = ({ children }: Props) => {
  return (
    <HomeProvider>
      <ProfileProvider>
        <AddPropertyProvider>
          {children}
        </AddPropertyProvider>
      </ProfileProvider>
    </HomeProvider>
  );
};

export default AppProviders;
