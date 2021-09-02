import React, { ReactNode } from 'react';
import HomeProvider from 'app/modules/Contexts/HomeContext';
import ProfileProvider from 'app/modules/Contexts/ProfileContext';

interface Props {
  children: ReactNode;
}

const AppProviders = ({ children }: Props) => {
  return (
    <HomeProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </HomeProvider>
  );
};

export default AppProviders;
