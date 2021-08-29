import React from 'react';

interface Props {
  className?: string;
}

const defaultProps: Props = {
  className: 'h-5 w-5',
};

const ChevronLeftVector = ({ className }: Props) => {
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
};

ChevronLeftVector.defaultProps = defaultProps;

export default ChevronLeftVector;
