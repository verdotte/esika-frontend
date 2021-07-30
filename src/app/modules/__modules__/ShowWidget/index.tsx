import React, { FC, ReactNode } from 'react';

interface IProps {
  condition: boolean;
  fallback?: ReactNode | null;
}

const defaultProps: IProps = {
  condition: false,
  fallback: null,
};

const ShowWidget: FC<IProps> = ({
  children,
  condition,
  fallback,
}): JSX.Element | null => {
  if (!condition && fallback) {
    return <>{fallback}</>;
  }

  if (!condition) {
    return null;
  }

  return <>{children}</>;
};

ShowWidget.defaultProps = defaultProps;

export default ShowWidget;
