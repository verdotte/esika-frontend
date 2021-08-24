import React from 'react';
import { onImageError } from 'app/modules/utils/helpers';
import placeholderImg from 'app/static/images/placeholder.jpg';
import { VerifiedIcon } from '../_vectors/verifiedICon';

const ImageProfile = () => {
  return (
    <>
      <div className="relative block w-16 h-16">
        <img
          src={placeholderImg}
          alt="User avatar"
          className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover"
          onError={onImageError}
        />
        <VerifiedIcon className="absolute bottom-0 right-0 text-blue-500 text-sm h-5 w-5" />
      </div>
    </>
  );
};

export default ImageProfile;
