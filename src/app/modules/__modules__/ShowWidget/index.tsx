import React, { FC, ReactNode } from 'react';

interface IProps {
  condition: boolean;
  fallback?: ReactNode | null;
  children: ReactNode;
}

const defaultProps: IProps = {
  condition: false,
  fallback: null,
  children: <div />,
};

const ShowWidget: FC<IProps> = ({
  children,
  condition,
  fallback,
}): JSX.Element | null => {
  if (!condition) {
    return null;
  }

  if (!condition && fallback) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
};

ShowWidget.defaultProps = defaultProps;

export default ShowWidget;
