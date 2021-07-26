import React, { FC, ChangeEvent, useMemo } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import { SUPPORTED_COUNTRIES } from 'app/modules/utils/helpers';
import { IData } from 'app/modules/@Types';

import 'react-phone-input-2/lib/style.css';

interface CountryData {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
}

interface Style {
  containerClass?: string;
  inputClass?: string;
  buttonClass?: string;
  dropdownClass?: string;
  searchClass?: string;

  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  searchStyle?: React.CSSProperties;
}

interface IProps extends Style {
  country?: string | number;
  value?: string | null;
  placeholder?: string;
  disabled?: boolean;
  disableCountryCode?: boolean;
  countryCodeEditable?: boolean;
  className?: string | null;
  onChange?: (
    value: string,
    data: IData | CountryData,
    event: ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ) => void;
}

const defaultProps: IProps = {
  country: '',
  value: null,
  placeholder: '',
  disabled: false,
  disableCountryCode: false,
  countryCodeEditable: true,
  onChange: () => null,
  className: '',
  containerClass: '',
  inputClass: '',
  buttonClass: '',
  dropdownClass: '',
  searchClass: '',
  containerStyle: {},
  inputStyle: {},
  buttonStyle: {},
  dropdownStyle: {},
  searchStyle: {},
};

const PhoneInput: FC<IProps> = ({ onChange, ...rest }: IProps) => {
  const onlyCountries = useMemo(
    () =>
      Object.keys(SUPPORTED_COUNTRIES).map(
        (country) => SUPPORTED_COUNTRIES[country].shortName,
      ),
    [],
  );
  return (
    <ReactPhoneInput
      onlyCountries={onlyCountries}
      onChange={onChange}
      {...rest}
    />
  );
};

PhoneInput.defaultProps = defaultProps;

export default PhoneInput;
