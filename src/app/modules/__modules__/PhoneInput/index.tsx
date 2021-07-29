import React, { FC, ChangeEvent, useMemo } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import { SUPPORTED_COUNTRIES } from 'app/modules/utils/helpers';
import { CountryData } from 'app/modules/@Types';

import 'react-phone-input-2/lib/style.css';

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
  inputProps?: Record<string, string>;
  onChange?: (
    value: string,
    data: CountryData,
    event: ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ) => void;
}

const defaultProps: IProps = {
  country: '',
  value: '',
  placeholder: '',
  disabled: false,
  disableCountryCode: false,
  countryCodeEditable: true,
  className: '',
  containerClass: '',
  inputClass: '',
  buttonClass: '',
  dropdownClass: '',
  searchClass: '',
  containerStyle: {},
  inputProps: {},
  inputStyle: {},
  buttonStyle: {},
  dropdownStyle: {},
  searchStyle: {},
  onChange: () => null,
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
