import React, { ReactElement } from 'react';
import PhoneVector from '../_vectors/phoneVector';

interface IProps {
  onClick?: () => void;
  vectorStyle?: string;
  className?: string;
  disabled?: boolean;
}

const defaultProps: IProps = {
  onClick: () => null,
  vectorStyle: undefined,
  disabled: false,
  className:
    'bg-green-600 text-white flex items-center justify-center space-x-2 w-full p-3 rounded-lg',
};

const ContactButton = ({
  vectorStyle,
  className,
  onClick,
  disabled,
}: IProps): ReactElement => {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <PhoneVector className={vectorStyle} />
      <p className="text-sm">Contacter</p>
    </button>
  );
};

ContactButton.defaultProps = defaultProps;

export default ContactButton;
