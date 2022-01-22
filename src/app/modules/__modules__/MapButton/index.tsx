import React, { ReactElement } from 'react';
import useResponsive from 'app/modules/Hooks/useResponsive';

interface IProps {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const defaultProps: IProps = {
  onClick: () => null,
};

const MapButton = ({ onClick }: IProps): ReactElement => {
  const [isMobile] = useResponsive();
  if (!isMobile) {
    return (
      <>
        <button
          type="button"
          className="w-[80%] p-1 bg-brand-bold text-sm text-white rounded-lg px-3 py-2 mt-3 "
          onClick={onClick}
        >
          Voir sur map
        </button>
      </>
    );
  }
  return (
    <>
      <button
        type="button"
        className="w-full p-3 bg-brand-bold text-white rounded-lg md:mx-auto md:px-16 mt-4 "
        onClick={onClick}
      >
        Voir sur map
      </button>
    </>
  );
};

MapButton.defaultProps = defaultProps;

export default MapButton;
