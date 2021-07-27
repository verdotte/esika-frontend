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
      className={`rounded-xl p-8 flex flex-col items-center justify-center xl:w-40 ${
        current ? 'bg-brand-bold' : 'bg-brand-thin'
      }`}
    >
      {icon}
      <p className="mt-2">{title}</p>
    </button>
  );
};

ExplorerCard.defaultProps = defaultProps;
