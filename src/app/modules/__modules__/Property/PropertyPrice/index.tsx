import React, { ReactElement } from 'react';

interface IProps {
  price?: string;
  unit?: string;
  className?: string;
}

const defaultProps: IProps = {
  price: '50 000',
  unit: 'mois',
  className: 'text-sm',
};

const PropertyPrice = ({
  price,
  unit,
  className,
}: IProps): ReactElement => {
  return (
    <p className={className}>
      ${price} / {unit !== 'month' ? 'mois' : unit}
    </p>
  );
};

PropertyPrice.defaultProps = defaultProps;

export default PropertyPrice;
