import React, { FC } from 'react';

interface Props {
  isTheLast?: boolean;
  name?: string;
}

const defaultProps: Props = {
  isTheLast: false,
  name: 'chambre',
};

const SpecInput: FC<Props> = ({ isTheLast, name }) => {
  return (
    <div className={`w-1/4 ${isTheLast ? '' : 'pr-[1.5%]'} mb-4`}>
      <p className="mb-2 text-sm text-black">{name}</p>
      <input
        id={name}
        name={name}
        type="number"
        placeholder="1"
        className="w-full py-3 px-4 outline-none text-black font-medium border border-gray-300 rounded-md"
      />
    </div>
  );
};

SpecInput.defaultProps = defaultProps;

export default SpecInput;
