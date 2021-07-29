/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';

interface IProps {
  pins: number;
  inputs: (HTMLInputElement | null)[];
  disabled?: boolean;
  onDeletePin?: null | (() => void | null | boolean);
  onInputPin?: null | (() => void | null | boolean);
  onPastePin?: null | (() => void | null | boolean);
  onSumitPin?: null | (() => void | null | boolean);
}

const defaultProps: Partial<IProps> = {
  disabled: false,
  onDeletePin: null,
  onInputPin: null,
  onPastePin: null,
  onSumitPin: null,
};

const OTPWidget: FC<IProps> = ({
  pins = 4,
  inputs,
  disabled,
  onDeletePin,
  onInputPin,
  onPastePin,
  onSumitPin,
}: IProps): JSX.Element => {
  const onSubmit = (index: number) => {
    const nonEmpties = inputs.filter((input) => input?.value);

    if (
      inputs.length - 1 === index &&
      nonEmpties.length === inputs.length
    ) {
      onSumitPin?.();
    }
  };

  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLTextAreaElement;
    const { value } = target;

    const index = event.currentTarget.getAttribute(
      'data-position',
    ) as unknown as number;

    const position = +index;

    const currentInputField = inputs[
      position
    ] as unknown as HTMLTextAreaElement;

    if (!/^-?\d*$/.test(value) || !value.length) {
      currentInputField.value = '';
      return false;
    }

    inputs[position + 1]?.focus();
    inputs[position + 1]?.select();

    onSubmit(position);
    return true;
  };

  const onBackSpace = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const eventType = event as React.KeyboardEvent<HTMLInputElement>;
    const key =
      eventType.keyCode ||
      eventType.charCode ||
      eventType.which ||
      eventType.key;

    const index = event.currentTarget.getAttribute(
      'data-position',
    ) as unknown as number;

    if (
      key === 8 ||
      key === 46 ||
      key === 'Backspace' ||
      key === 'Delete'
    ) {
      const target = event.target as HTMLTextAreaElement;

      const { value } = target;

      const previousIndex: number = index - 1;
      const input = inputs[previousIndex];

      if (!value) {
        input?.focus();
        input?.select();
      }
    }
  };

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const textValue = event.clipboardData.getData('text');

    const currInputIndex = Number(
      event.currentTarget.getAttribute(
        'data-position',
      ) as unknown as number,
    );

    if (!/^-?\d*$/.test(textValue)) return;

    const remainingInputs = inputs.length - currInputIndex;
    const values = textValue.split('');

    Array.from({ length: remainingInputs }).forEach(
      (_, index: number) => {
        const position = index + currInputIndex;
        const input = inputs[
          position
        ] as unknown as HTMLTextAreaElement;

        if (input && values[index]) {
          input.value = values[index];
        }
      },
    );
  };

  return (
    <div className="my-3 flex space-x-3">
      {Array.from({ length: pins }).map((_, index) => (
        <input
          type="text"
          maxLength={1}
          id={`input_${index}`}
          ref={(el) => {
            inputs[index] = el;
            return inputs[index];
          }}
          key={`input_${index}`}
          autoComplete="off"
          data-position={index}
          onInput={onInputPin || onInput}
          onKeyDown={onDeletePin || onBackSpace}
          onPaste={onPastePin || onPaste}
          disabled={disabled}
          className="appearance-none border rounded-md w-12 h-12 focus:border-brand-bold outline-none text-center transition-all"
        />
      ))}
    </div>
  );
};

OTPWidget.defaultProps = defaultProps;

export default OTPWidget;
