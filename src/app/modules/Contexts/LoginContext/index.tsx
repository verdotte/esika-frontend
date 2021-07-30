import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { alertType, CountryData, IContext } from 'app/modules/@Types';
import {
  formDataToObject,
  isValidPhoneNumber,
} from 'app/modules/utils/helpers';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import browserHistory from 'app/modules/utils/helpers/browserHistory';

type stateObject = Record<string, string>;

type loginCtxType = {
  formRef: HTMLFormElement | null;
  errors: {
    phoneNumber?: string | null;
    wrongCode?: string | null;
    message?: string | null;
    type?: alertType;
  };
  codeInputRefs: (HTMLFormElement | null)[];
  isPerforming: boolean;
  onClearMessage?: () => void;
  onLogin?: (event: React.SyntheticEvent) => void;
};

const ctxDefaultState: loginCtxType = {
  formRef: null,
  errors: {
    phoneNumber: '',
    wrongCode: '',
    message: '',
    type: 'error',
  },
  codeInputRefs: [],
  isPerforming: false,
};

export const LoginContext = createContext<loginCtxType & IContext>(
  ctxDefaultState,
);
export const useLogin = () => useContext(LoginContext);

const LoginProvider: FC = ({ children }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<stateObject>({
    phoneNumber: '',
    wrongCode: '',
    type: 'error',
  });

  const codeInputRefs = useRef<(HTMLInputElement | null)[]>(
    [],
  ).current;

  const [countryCode, setCountryCode] = useState<string>('DEFAULT');

  const [isPerforming, setIsPerforming] = useState<boolean>(false);

  const onPhoneChange = useCallback((_, data: CountryData) => {
    const { countryCode } = data;

    setCountryCode(countryCode);
  }, []);

  const onCountryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const target = event.currentTarget;

    const { value } = target;

    setCountryCode(() => value);
  };

  const validateForm = (formData: FormData) => {
    const { phoneNumber, country } = formDataToObject(formData);

    let valid = true;

    const formErrors = { ...errors };

    if (!country || country === 'DEFAULT') {
      formErrors.phoneNumber = 'Veuillez choisir votre pays';
      valid = false;
    }

    if (!isValidPhoneNumber(phoneNumber as string, country)) {
      formErrors.phoneNumber = 'Veuillez entrer un numero valide';
      valid = false;
    }

    if (!valid) {
      setErrors(formErrors);
    }

    return valid;
  };

  const onLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setErrors({});

    const target = event.target as HTMLFormElement;

    const formData = new FormData(target);
    if (validateForm(formData)) {
      const payload = formDataToObject(formData);
      payload.country = undefined;

      setIsPerforming(true);

      const { error, data } = await Service.post(
        ENDPOINTS.LOGIN,
        payload,
      );

      setIsPerforming(false);

      if (error) {
        setErrors((prev) => ({
          ...prev,
          message: error,
          type: 'error',
        }));
        return;
      }

      if (data) {
        formRef.current?.reset();
        browserHistory.push('/');
      }
    }
  };

  const onClearMessage = useCallback(() => {
    setErrors((prev) => ({ ...prev, message: '' }));
  }, []);

  return (
    <LoginContext.Provider
      value={{
        formRef: formRef as unknown as HTMLFormElement,
        errors,
        countryCode,
        isPerforming,
        codeInputRefs: codeInputRefs as (HTMLFormElement | null)[],
        onClearMessage,
        onLogin,
        onCountryChange,
        onPhoneChange,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
