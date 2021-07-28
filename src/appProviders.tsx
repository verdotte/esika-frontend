import React, { ReactNode } from 'react';
import HomeProvider from 'app/modules/Contexts/HomeContext';

interface Props {
  children: ReactNode;
}

const AppProviders = ({ children }: Props) => {
  return <HomeProvider>{children}</HomeProvider>;
};

export default AppProviders;
