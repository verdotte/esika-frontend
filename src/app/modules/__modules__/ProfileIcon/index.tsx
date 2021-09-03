import React, { FC } from 'react';
import { onImageError } from 'app/modules/utils/helpers';
import placeholderImg from 'app/static/images/placeholder.jpg';
import UserVector from '../_vectors/userVector';

interface Props {
  image?: string;
  className?: string;
}

const defaultProps: Props = {
  image: placeholderImg,
  className: 'relative block h-6 w-6',
};

const ProfileIcon: FC<Props> = ({
  image,
  className,
}): JSX.Element => {
  return (
    <div className={className}>
      {image === null ? (
        <img
          src={image || placeholderImg}
          alt="User avatar"
          className="h-6 w-6 rounded-full object-cover"
          onError={onImageError}
        />
      ) : (
        <UserVector />
      )}
    </div>
  );
};

ProfileIcon.defaultProps = defaultProps;

export default ProfileIcon;
