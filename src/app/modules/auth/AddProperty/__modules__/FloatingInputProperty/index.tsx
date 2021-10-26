import React, { FC, memo } from 'react';

interface Props {
  name?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultProps: Props = {
  name: '',
  label: '',
  onChange: () => null,
};

const FloatingInputProperty: FC<Props> = ({ name, label, onChange }: Props): JSX.Element => {
  return (
    <div className="w-full mb-3 border border-gray-300 rounded-md flex items-center pt-6 pb-2 pl-4 pr-4 overflow-hidden">
      <div className="w-full h-6 relative pl-2 pb-1">
        <input
          id={name}
          name={name}
          type="text"
          placeholder={label}
          className="w-[95%] absolute -top-0.3 peer outline-none text-black font-medium placeholder-transparent bg-transparent"
          onChange={onChange}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor={name}
          className="absolute left-2 -top-3.5 text-xs text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-top-1.5"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

FloatingInputProperty.defaultProps = defaultProps;

export default memo(FloatingInputProperty);
