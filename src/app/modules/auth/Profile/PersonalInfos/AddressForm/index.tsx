// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import CountrySelectorInput from 'app/modules/__modules__/CountrySelectorInput';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import FloatingInputLabel from '../FloatingInputLabel';

interface Props {
  label: string;
}

const AddressForm = ({ label }: Props) => {
  return (
    <>
      <div className="mb-3 px-4 py-2 border border-gray-300 rounded">
        <label
          htmlFor={label}
          className="text-gray-600 text-xs transition-all duration-100"
        >
          Pays/Region
        </label>
        <div className="w-full inline-block relative">
          <CountrySelectorInput className="appearance-none block w-full text-black font-medium focus:outline-none" />
          <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
            <ChevroDownVector className="fill-brand-bold h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
        <FloatingInputLabel defaultValue="Bukavu" label="Ville" />
      </div>
      <div className="w-full flex justify-between">
        <div className="w-[55%] mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
          <FloatingInputLabel defaultValue="Bukavu" label="Etat" />
        </div>
        <div className="w-2/5 mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
          <FloatingInputLabel defaultValue="" label="Code Postal" />
        </div>
      </div>
      {/* <div className="flex justify-end items-center">
        <button
          type="submit"
          className="py-2 px-3 bg-brand-bold text-white rounded"
        >
          Enregistrer
        </button>
      </div> */}
    </>
  );
};

export default memo(AddressForm);
