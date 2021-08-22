import React from 'react';
import {
  defaultVectorProps,
  classNameInterface,
} from 'app/modules/@Types';

const ChevroDownVector = ({ className }: classNameInterface) => {
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

ChevroDownVector.defaultProps = defaultVectorProps;

export default ChevroDownVector;
