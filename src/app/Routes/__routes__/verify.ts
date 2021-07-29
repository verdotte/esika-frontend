import VerifyCode from 'app/Initials/__noAuth/Verify';

const verify = {
  title: 'Esika - Verifier votre numero de telephone',
  secured: false,
  path: '/verify',
  exact: true,
  Component: VerifyCode,
};

export default verify;
