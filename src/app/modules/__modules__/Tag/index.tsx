import React, { FC } from 'react';
import ShowWidget from '../ShowWidget';

interface Props {
  condition?: boolean;
  tag: string | JSX.Element;
  icon?: null | JSX.Element;
  className?: string;
}

const defaultProps: Props = {
  condition: true,
  tag: 'Chambre',
  icon: null,
  className: 'bg-white text-gray-700',
};

const Tag: FC<Props> = ({
  condition = true,
  tag,
  className,
  icon,
}) => {
  if (!tag) {
    return null;
  }

  return (
    <ShowWidget
      condition={condition}
      fallback={
        <div className="h-4 w-12 rounded-full mr-3 bg-gray-200 animate-pulse" />
      }
    >
      <div
        className={`p-2 px-3 rounded-full mr-3 flex items-center space-x-2 ${className}`}
      >
        {icon}
        <p className="text-xs whitespace-nowrap">{tag}</p>
      </div>
    </ShowWidget>
  );
};

Tag.defaultProps = defaultProps;

export default Tag;
