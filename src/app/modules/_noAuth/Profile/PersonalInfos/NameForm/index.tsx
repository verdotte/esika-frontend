import React, { memo } from 'react';
import FloatingInputLabel from '../FloatingInputLabel';

interface Props {
  label: string;
  defaultValue: string;
  onChange: () => void;
}

const NameForm = ({ label, defaultValue, onChange }: Props) => {
  return (
    <>
      <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
        <FloatingInputLabel
          defaultValue={defaultValue}
          label={label}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default memo(NameForm);
