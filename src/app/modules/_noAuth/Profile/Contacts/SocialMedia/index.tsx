import React, { memo } from 'react';

interface Props {
  icon: string;
  placeholder: string;
}

const SocialMedia = ({ icon, placeholder }: Props) => {
  return (
    <>
      <div className="w-[90%] mt-4 border border-gray-300 rounded flex justify-between items-center">
        <p className="px-3 border-r border-gray-300 text-sm sm:text-xl text-gray-800">
          {icon}
        </p>
        <input
          className="appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm sm:text-xl "
          type="text"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default memo(SocialMedia);
