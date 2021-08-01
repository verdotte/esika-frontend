import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface IProps {
  title: string;
  to: string;
  icon: JSX.Element;
  current: boolean;
  onClick?: () => void;
}

const BottomNavbarItem: FC<IProps> = ({
  title,
  icon,
  to,
  current = false,
  onClick,
}) => {
  const history = useHistory();

  const onItemClick = () => {
    history.push(to);
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={onItemClick}
      className={`flex flex-col items-center text-xs ${
        current ? 'text-red-500' : ''
      }`}
    >
      {icon}
      <p>{title}</p>
    </button>
  );
};

export default BottomNavbarItem;
