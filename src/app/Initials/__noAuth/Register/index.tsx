import React, { FC } from 'react';
import RegisterActivity from 'app/modules/_noAuth/Register';
import RegisterProvider from 'app/modules/Contexts/RegisterContext';

const Register: FC = (): JSX.Element => {
  return (
    <RegisterProvider>
      <RegisterActivity />
    </RegisterProvider>
  );
};

export default Register;
