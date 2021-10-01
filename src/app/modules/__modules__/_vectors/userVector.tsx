import React from 'react';

interface Props {
  className?: string;
  stroke?: string;
  strokeOpacity?: string;
}

const defaultProps: Props = {
  className: 'h-5 w-5',
  stroke: 'black',
  strokeOpacity: '0.64',
};

const UserVector = ({ className, stroke, strokeOpacity }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke={stroke}
      strokeOpacity={strokeOpacity}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

UserVector.defaultProps = defaultProps;

export default UserVector;
