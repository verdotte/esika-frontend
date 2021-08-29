import React, { FC, ReactElement } from 'react';
import { classNameInterface } from 'app/modules/@Types';

const defaultProps: classNameInterface = {
  className: 'h-6 w-6',
};

const HamburgerVector: FC<classNameInterface> = ({
  className,
}): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  );
};
HamburgerVector.defaultProps = defaultProps;
export default HamburgerVector;
