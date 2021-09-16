import React from 'react';

interface Props {
  className?: string;
}

const defaultProps: Props = {
  className: 'h-5 w-5',
};

const ChevronRightVector = ({ className }: Props) => {
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
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
};

ChevronRightVector.defaultProps = defaultProps;

export default ChevronRightVector;
