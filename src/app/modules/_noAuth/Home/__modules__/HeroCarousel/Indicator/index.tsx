import React from 'react';

interface Props {
  current: boolean;
  onClick: (currentPosition: number) => void;
  defaultStyle?: string;
  currentStyle?: string;
  className?: string;
  position: number;
}

type defaultPropsType = Pick<
  Props,
  'defaultStyle' | 'currentStyle' | 'className'
>;

const defaultProps: defaultPropsType = {
  defaultStyle: 'w-5',
  currentStyle: 'w-12 bg-brand-bold',
  className: 'h-2 border border-brand-bold rounded-full mr-3',
};

export const HeroCarouselIndicator = ({
  current = false,
  onClick = () => null,
  defaultStyle,
  currentStyle,
  className,
  position = 0,
}: Props) => {
  const styleName = current ? currentStyle : defaultStyle;
  const onIndicatorClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const position =
      event.currentTarget.getAttribute('data-position');
    onClick(Number(position));
  };
  return (
    <>
      <button
        type="button"
        onClick={onIndicatorClick}
        data-position={position}
        className={`${styleName} ${className}`}
      />
      <input type="radio" className="hidden" />
    </>
  );
};

HeroCarouselIndicator.defaultProps = defaultProps;
