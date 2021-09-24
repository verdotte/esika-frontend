// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, memo } from 'react';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import CountrySelectorInput from 'app/modules/__modules__/CountrySelectorInput';
import ENDPOINTS from 'app/Services/endpoints';
import Service from 'app/Services';

const NumberForm = () => {
  const {
    currentUser,
    code,
    currentUserNumber,
    onCodeChange,
    setHideChildren,
  } = useProfile();
  const [startProcess, setStartProcess] = useState(false);
  const [value, setValue] = useState('');

  const updatingProcess = async () => {
    setStartProcess(true);

    const userCredentials = {
      phoneNumber: `${code} ${value}`,
    };

    const { error, data } = await Service.put(
      `${ENDPOINTS.EDIT_PROFILE}/${currentUser.userId}`,
      userCredentials,
    );

    if (error) {
      setStartProcess(false);
      return;
    }

    setStartProcess(false);
    setHideChildren((prev) => !prev);
  };

  const onValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="mb-3 p-2">
        <div className="w-full inline-block relative">
          <CountrySelectorInput onChange={onCodeChange} />
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
            defaultValue={currentUserNumber}
            onChange={onValueChange}
          />
        </div>
      </div>
    </>
  );
};

export default memo(NumberForm);
