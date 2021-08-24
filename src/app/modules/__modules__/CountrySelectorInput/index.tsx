// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { SUPPORTED_COUNTRIES } from 'app/modules/utils/helpers';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import { classNameInterface } from 'app/modules/@Types';

const CountrySelectorInput = ({ className }: classNameInterface) => {
  const { setCode } = useProfile();
  const onCodeChange = (event) => {
    if (setCode) {
      setCode(event.target.value);
    }
  };
  return (
    <>
      <select className={className} onChange={onCodeChange}>
        <option value="DEFAULT" disabled>
          Pays
        </option>
        {Object.keys(SUPPORTED_COUNTRIES).map((country) => (
          <option
            key={`country_${country}`}
            value={SUPPORTED_COUNTRIES[country].countryCode}
          >
            {SUPPORTED_COUNTRIES[country].countryName}
          </option>
        ))}
      </select>
    </>
  );
};

export default CountrySelectorInput;
