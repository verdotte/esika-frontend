// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import InputForm from '../../../../__modules__/FloatingInputLabel';

interface Props {
  label: string;
  data: string;
}

const NameForm = ({ label, data }: Props) => {
  return (
    <>
      <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
        <InputForm data={data} label={label} />
      </div>
      <div className="flex justify-end items-center">
        <button
          type="submit"
          className="py-2 px-3 bg-blue-300 text-white rounded"
        >
          Enregistrer
        </button>
      </div>
    </>
  );
};

export default memo(NameForm);
