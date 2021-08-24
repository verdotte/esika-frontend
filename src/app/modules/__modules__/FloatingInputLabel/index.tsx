// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';

interface Props {
  label: string;
  data: string;
}

const FloatingInputLabel = ({ label, data }: Props) => {
  return (
    <div className="w-full relative">
      <input
        id={label}
        name={label}
        type="text"
        placeholder="Prénom"
        className="peer outline-none text-black font-medium placeholder-transparent bg-transparent"
        defaultValue={data}
      />
      <label
        htmlFor="firstName"
        className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-1.5"
      >
        {label}
      </label>
    </div>
  );
};

export default memo(FloatingInputLabel);
