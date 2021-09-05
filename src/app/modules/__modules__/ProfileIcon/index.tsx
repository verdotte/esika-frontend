import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { onImageError } from 'app/modules/utils/helpers';
import placeholderImg from 'app/static/images/placeholder.jpg';

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
  const history = useHistory();
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
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style={{
            fill: `${
              history.location.pathname === '/profile'
                ? 'rgba(239, 68, 68, 1)'
                : 'black'
            }`,
            borderRadius: '20px',
            padding: '2px',
          }}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <circle cx="256" cy="114.526" r="114.526" />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421
			c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z"
              />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

ProfileIcon.defaultProps = defaultProps;

export default ProfileIcon;
