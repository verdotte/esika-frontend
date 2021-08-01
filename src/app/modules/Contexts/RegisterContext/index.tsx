import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { alertType, CountryData, IObject } from 'app/modules/@Types';
import {
  formDataToObject,
  isValidPhoneNumber,
} from 'app/modules/utils/helpers';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import LocalStorage from 'app/modules/utils/helpers/LocalStorage';
import browserHistory from 'app/modules/utils/helpers/browserHistory';
import keys from 'app/modules/utils/configs/keys';

type stateObject = Record<string, string>;

type registerCtxType = {
  formRef: HTMLFormElement | null;
  errors: {
    firstName?: string;
    lastName?: string | null;
    phoneNumber?: string | null;
    wrongCode?: string | null;
    message?: string | null;
    type?: alertType;
  };
  codeInputRefs: (HTMLFormElement | null)[];
  isPerforming: boolean;
  onClearMessage?: () => void;
  onRegister?: (event: React.SyntheticEvent) => void;
  onResendCode?: () => void;
  onVerifyCode?: () => void;
};

const ctxDefaultState: registerCtxType = {
  formRef: null,
  errors: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    wrongCode: '',
    message: '',
    type: 'error',
  },
  codeInputRefs: [],
  isPerforming: false,
};

export const RegisterContext = createContext<
  registerCtxType & IObject
>(ctxDefaultState);
export const useRegister = () => useContext(RegisterContext);

const RegisterProvider: FC = ({ children }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<stateObject>({
    firstName: '',
    lastName: '',
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
    const { phoneNumber, firstName, lastName, country } =
      formDataToObject(formData);

    let valid = true;

    const formErrors = { ...errors };

    if (!firstName) {
      formErrors.firstName = 'Veuillez entrer votre prenom';
      valid = false;
    }

    if (!lastName) {
      formErrors.lastName = 'Veuillez entrer votre nom de famille';
      valid = false;
    }

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

  const onRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setErrors({});

    const target = event.target as HTMLFormElement;

    const formData = new FormData(target);
    if (validateForm(formData)) {
      const payload = formDataToObject(formData);
      payload.country = undefined;

      setIsPerforming(true);

      const { error, data } = await Service.post(
        ENDPOINTS.REGISTER,
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
        const { phoneNumber } = data;
        LocalStorage.set(
          keys.PHONE_STORAGE_KEY as string,
          phoneNumber,
        );
        formRef.current?.reset();
        browserHistory.push('/verify');
      }
    }
  };

  const isValidateCode = (codes) => {
    const formErrors = { ...errors };

    if (!codes.length) {
      formErrors.wrongCode =
        'Veuillez entrer le code de vérification';
      return false;
    }

    if (codes.length < 4) {
      formErrors.wrongCode =
        'Veuillez entrer 4 chiffres pour verifier';
      return false;
    }
    return true;
  };

  const onVerifyCode = async () => {
    const verifyCodes = codeInputRefs.map((code) => code?.value);

    if (isValidateCode(verifyCodes)) {
      const payload = {
        phoneNumber: LocalStorage.get(
          keys.PHONE_STORAGE_KEY as string,
        ),
        code: verifyCodes.join(''),
      };

      setIsPerforming(true);

      const { data, error } = await Service.post(
        ENDPOINTS.VERIFY_CODE,
        payload,
      );

      setIsPerforming(false);

      if (error) {
        setErrors((prev) => ({
          ...prev,
          message:
            error.length < 98
              ? error
              : "Quelque chose s'est mal passé. Veuillez réessayer",
          type: 'error',
        }));
        return;
      }

      if (data) {
        const { token } = data;

        if (token) {
          LocalStorage.setToken(token);
          LocalStorage.remove(keys.PHONE_STORAGE_KEY as string);

          setErrors((prev) => ({
            ...prev,
            message:
              'Votre compte a été vérifié avec succès. Vous serez bientôt redirigé vers la page de connexion.',
          }));

          setTimeout(() => {
            browserHistory.push('/login');
          }, 1500);
        }
      }
    }
  };

  const onClearMessage = useCallback(() => {
    setErrors((prev) => ({ ...prev, message: '' }));
  }, []);

  const onResendCode = async () => {
    const phoneNumber = LocalStorage.get(
      keys.PHONE_STORAGE_KEY as string,
    );

    onClearMessage();

    if (!phoneNumber) {
      setErrors((prev) => ({
        ...prev,
        message: 'Veuillez fournir votre numéro de téléphone',
      }));
      return;
    }

    setIsPerforming(true);

    const { data, error } = await Service.post(
      ENDPOINTS.RESEND_CODE,
      { phoneNumber },
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
      setErrors((prev) => ({
        ...prev,
        message: `Le code de vérification a été au numéro ${phoneNumber}`,
        type: 'success',
      }));
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        formRef: formRef as unknown as HTMLFormElement,
        errors,
        countryCode,
        isPerforming,
        codeInputRefs: codeInputRefs as (HTMLFormElement | null)[],
        onClearMessage,
        onRegister,
        onCountryChange,
        onPhoneChange,
        onResendCode,
        onVerifyCode,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
