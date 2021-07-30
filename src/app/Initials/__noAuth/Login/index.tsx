import React, { FC } from 'react';
import LoginActivity from 'app/modules/_noAuth/Login';
import LoginProvider from 'app/modules/Contexts/LoginContext';

const Login: FC = (): JSX.Element => {
  return (
    <LoginProvider>
      <LoginActivity />
    </LoginProvider>
  );
};

export default Login;
