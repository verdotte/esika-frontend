import React, { FC, useEffect, useRef } from 'react';
import { alertType } from 'app/modules/@Types';

interface Props {
  message?: string | null | undefined;
  type?: alertType;
  show?: boolean;
  className?: string;
  onHide?: () => void;
}

const defaultProps: Props = {
  message: null,
  type: 'error',
  show: false,
  className: '',
};

const AlertBox: FC<Props> = ({
  message,
  type,
  show,
  className,
  onHide,
}): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === 'error') {
      wrapperRef.current?.classList.remove(
        'bg-green-100',
        'text-green-500',
        'border-green-400',
      );
      wrapperRef.current?.classList.add(
        'bg-red-200',
        'text-red-500',
        'border-red-400',
      );
    }
    if (type === 'success') {
      wrapperRef.current?.classList.remove(
        'bg-red-200',
        'text-red-500',
        'border-red-400',
      );
      wrapperRef.current?.classList.add(
        'bg-green-100',
        'text-green-500',
        'border-green-400',
      );
    }
  }, [wrapperRef, type, show]);

  if (!show) {
    return <>{null}</>;
  }

  return (
    <div
      className={`p-3 text-center text-xs md:text-sm my-2 rounded-md border flex items-center ${className}`}
      ref={wrapperRef}
    >
      <p className="w-full">{message}</p>
      <button
        type="button"
        className="text-lg font-bold text-black hover:text-black/50"
        onClick={onHide}
      >
        &times;
      </button>
    </div>
  );
};

AlertBox.defaultProps = defaultProps;

export default AlertBox;
