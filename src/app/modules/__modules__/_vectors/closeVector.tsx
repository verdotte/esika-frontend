import React from 'react';
import {
  defaultVectorProps,
  classNameInterface,
} from 'app/modules/@Types';

const CloseVector = ({ className }: classNameInterface) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="53.7"
      height="53.7"
      viewBox="0 0 53.7 53.7"
    >
      <path
        opacity="1"
        fill="%23666E6E"
        d="M35.6 34.4L28 26.8l7.6-7.6c.2-.2.2-.5 0-.7l-.5-.5c-.2-.2-.5-.2-.7 0l-7.6 7.6-7.5-7.6c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7l7.6 7.6-7.6 7.5c-.2.2-.2.5 0 .7l.5.5c.2.2.5.2.7 0l7.6-7.6 7.6 7.6c.2.2.5.2.7 0l.5-.5c.2-.2.2-.5 0-.7z"
      />
    </svg>
  );
};

CloseVector.defaultVectorProps = defaultVectorProps;

export default CloseVector;
