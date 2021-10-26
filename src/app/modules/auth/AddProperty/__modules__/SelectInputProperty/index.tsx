import React, { ChangeEventHandler, FC } from 'react';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import { SUPPORTED_CATEGORIES } from 'app/modules/utils/helpers';

interface Props {
  name?: string;
  className?: string;
  selectClassName?: string;
  vectorClassName?: string;
  defaultOption?: string;
  options?: any;
  isSmall?: boolean;
  onSelectChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
}

const defaultProps: Props = {
  name: '',
  className: 'mb-3 px-4 py-4 border border-gray-300 rounded-md',
  selectClassName: 'w-full inline-block relative',
  vectorClassName: 'pointer-events-none absolute inset-y-0 right-[01%] flex items-center px-2 text-gray-700',
  defaultOption: 'Sélectionner la catégorie de votre immobilier',
  options: SUPPORTED_CATEGORIES,
  isSmall: false,
  onSelectChange: () => null,
};

const SelectInputProperty: FC<Props> = ({ name, className, selectClassName, vectorClassName, defaultOption, options, isSmall, onSelectChange }) => {
  return (
    <div className={className}>
      <div className={selectClassName}>
        <select
          id={name}
          name={name}
          className={` ${
            isSmall ? 'w-[90%]' : 'w-full'
          } whitespace-nowrap overflow-hidden overflow-ellipsis appearance-none block text-black font-medium focus:outline-none`}
          onChange={onSelectChange}
        >
          <option value="DEFAULT" disabled>
            {defaultOption}
          </option>
          {Object.keys(options).map((opt) => (
            <option key={opt} value={options[opt].name}>
              {options[opt].label}
            </option>
          ))}
        </select>
        <div className={vectorClassName}>
          <ChevroDownVector className="fill-brand-bold h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

SelectInputProperty.defaultProps = defaultProps;

export default SelectInputProperty;
