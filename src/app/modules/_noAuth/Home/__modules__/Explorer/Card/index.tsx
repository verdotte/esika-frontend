import React from 'react';

interface Props {
  current?: boolean;
  title?: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

const defaultProps = {
  current: false,
  title: 'Maison',
  icon: <div />,
  onClick: () => null,
};

export const ExplorerCard = ({
  current,
  title,
  icon,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`square rounded-xl p-4 first:ml-3 md:first:ml-0 mr-3 w-40 flex flex-col items-center justify-center text-white ${
        current ? 'bg-brand-bold' : 'bg-brand-thin'
      }`}
    >
      {icon}
      <p className="mt-2 text-xs md:text-sm line-clamp-2">{title}</p>
    </button>
  );
};

ExplorerCard.defaultProps = defaultProps;
