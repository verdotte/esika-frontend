// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
import React, { memo } from 'react';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import CountrySelectorInput from 'app/modules/__modules__/CountrySelectorInput';

interface Props {
  data: string;
}

const NumberForm = ({ data }: Props) => {
  const { code } = useProfile();

  return (
    <>
      <div className="mb-3 p-2">
        <div className="w-full inline-block relative">
          <CountrySelectorInput className="appearance-none block w-full border border-gray-300 rounded py-3 pl-4 pr-8 leading-tight focus:bg-white focus:outline-none focus:shadow-outline text-sm sm:text-xl text-gray-800" />
          <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
            <ChevroDownVector className="fill-brand-bold h-5 w-5" />
          </div>
        </div>
        <div className="my-4 border border-gray-300 rounded flex justify-between items-center">
          <p className="px-3 border-r border-gray-300 text-sm sm:text-xl text-gray-800">
            {code}
          </p>
          <input
            className="appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm sm:text-xl text-gray-900"
            id="grid-last-name"
            type="text"
            defaultValue={data}
          />
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="py-2 px-3 bg-blue-300 text-white rounded"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(NumberForm);
