import React, { FC } from 'react';
import ShowWidget from '../ShowWidget';

interface Props {
  condition?: boolean;
  tag: string | JSX.Element;
}

const defaultProps: Props = {
  condition: true,
  tag: 'Chambre',
};

const Tag: FC<Props> = ({ condition = true, tag }) => {
  return (
    <ShowWidget
      condition={condition}
      fallback={
        <div className="h-4 w-12 rounded-full mr-3 bg-gray-200 animate-pulse" />
      }
    >
      <div className="p-2 px-3 rounded-full bg-white text-gray-700 mr-3">
        <p className="text-xs whitespace-nowrap">{tag}</p>
      </div>
    </ShowWidget>
  );
};

Tag.defaultProps = defaultProps;

export default Tag;
