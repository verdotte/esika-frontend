import React from 'react';

interface IProps {
  className?: string;
  stroked?: boolean;
}

const defaultProps: IProps = {
  className: 'h-5 w-5',
  stroked: false,
};

export const HeartSolidVector = ({ className, stroked }: IProps) => {
  if (stroked) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={className}
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke="currentColor"
    // >
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     strokeWidth={2}
    //     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    //   />
    // </svg>
  );
};

HeartSolidVector.defaultProps = defaultProps;
