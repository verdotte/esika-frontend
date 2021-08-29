import React, { ReactElement } from 'react';
import PhoneVector from '../_vectors/phoneVector';

interface IProps {
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
  vectorStyle?: string;
  className?: string;
  phoneNumber?: string;
}

const defaultProps: IProps = {
  onClick: () => null,
  vectorStyle: undefined,
  className:
    'bg-green-600 text-white flex items-center justify-center space-x-2 w-full p-3 rounded-lg',
  phoneNumber: '',
};

const ContactButton = ({
  vectorStyle,
  className,
  onClick,
  phoneNumber,
}: IProps): ReactElement => {
  return (
    <a
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={onClick}
    >
      <PhoneVector className={vectorStyle} />
      <p className="text-sm">Contacter</p>
    </a>
  );
};

ContactButton.defaultProps = defaultProps;

export default ContactButton;
