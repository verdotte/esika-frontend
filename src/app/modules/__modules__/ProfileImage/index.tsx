import React, { FC } from 'react';
import { onImageError } from 'app/modules/utils/helpers';
import placeholderImg from 'app/static/images/placeholder.jpg';
import { VerifiedIcon } from '../_vectors/verifiedICon';
import ShowWidget from '../ShowWidget';

interface Props {
  image?: string;
  className?: string;
  verified?: boolean;
}

const defaultProps: Props = {
  image: placeholderImg,
  verified: false,
  className: 'relative block w-16 h-16',
};

const ProfileImage: FC<Props> = ({
  image,
  verified,
  className,
}): JSX.Element => {
  return (
    <>
      <div className={className}>
        <img
          src={image || placeholderImg}
          alt="User avatar"
          className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover"
          onError={onImageError}
        />
        <ShowWidget condition={!!verified}>
          <VerifiedIcon className="absolute bottom-0 right-0 text-blue-500 text-sm h-5 w-5" />
        </ShowWidget>
      </div>
    </>
  );
};

ProfileImage.defaultProps = defaultProps;

export default ProfileImage;
