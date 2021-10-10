import React, { FC } from 'react';

interface Props {
  isLong?: boolean;
  name?: string;
}

const defaultProps: Props = {
  isLong: false,
  name: '',
};

const Title: FC<Props> = ({ isLong, name }) => {
  return (
    <div className="w-full h-16 flex bg-brand-bold rounded-full">
      <div
        className={
          isLong ? '' : 'w-16 h-16 flex bg-white rounded-full'
        }
      />
      <div
        className={` ${
          isLong ? 'pl-6' : 'pl-8'
        } flex items-center justify-center`}
      >
        <p className={`text-white ${isLong ? 'text-sm' : 'text-lg'}`}>
          {name}
        </p>
      </div>
    </div>
  );
};

Title.defaultProps = defaultProps;

export default Title;
