import React, { FC } from 'react';
import { SUPPORTED_COUNTRIES } from 'app/modules/utils/helpers';

interface Props {
  isCountryName?: boolean;
  nameSelectInput?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const defaultProps: Props = {
  isCountryName: false,
  nameSelectInput: '',
  className:
    'appearance-none block w-full border border-gray-300 rounded py-3 pl-4 pr-8 leading-tight focus:bg-white focus:outline-none focus:shadow-outline text-sm sm:text-xl text-gray-800',
  onChange: () => null,
};

const CountrySelectorInput: FC<Props> = ({
  isCountryName,
  nameSelectInput,
  className,
  onChange,
}): JSX.Element => {
  return (
    <select
      name={nameSelectInput}
      className={className}
      onChange={onChange}
      onBlur={() => null}
    >
      <option value="DEFAULT" disabled>
        Pays
      </option>
      {Object.keys(SUPPORTED_COUNTRIES).map((country) => (
        <option
          key={`country_${country}`}
          value={
            isCountryName
              ? SUPPORTED_COUNTRIES[country].countryName
              : SUPPORTED_COUNTRIES[country].countryCode
          }
        >
          {SUPPORTED_COUNTRIES[country].countryName}
        </option>
      ))}
    </select>
  );
};

CountrySelectorInput.defaultProps = defaultProps;

export default CountrySelectorInput;
