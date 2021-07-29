import React, { FC } from 'react';
import VerifyCodeActivity from 'app/modules/_noAuth/Verify';
import RegisterProvider from 'app/modules/Contexts/RegisterContext';

const VerifyCode: FC = (): JSX.Element => {
  return (
    <RegisterProvider>
      <VerifyCodeActivity />
    </RegisterProvider>
  );
};

export default VerifyCode;
