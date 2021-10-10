import React, { FC } from 'react';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';

interface Props {
  name?: string;
  className?: string;
}

const defaultProps: Props = {
  name: '',
  className: 'mb-3 px-4 py-4 border border-gray-300 rounded-md',
};

const SelectInputProperty: FC<Props> = ({ name, className }) => {
  return (
    <div className={className}>
      <div className="w-full inline-block relative">
        <select
          name={name}
          className="appearance-none pl-2 block w-full text-black font-medium focus:outline-none"
          onBlur={() => null}
        >
          {/* {Object.keys(options).map((opt) => (
            <option key={opt} value={options[opt].value}>
              {options[opt].name}
            </option>
          ))} */}
          <option value="DEFAULT" disabled>
            Sélectionner la catégorie de votre immobilier
          </option>
          <option value="House">Maison</option>
          <option value="Hotel">Hotel</option>
          <option value="Land">Parcelle</option>
          <option value="Apartment">Appartements</option>
          <option value="Commercial">Magasins</option>
          <option value="Studio">Studio</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-[01%] flex items-center px-2 text-gray-700">
          <ChevroDownVector className="fill-brand-bold h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

SelectInputProperty.defaultProps = defaultProps;

export default SelectInputProperty;
