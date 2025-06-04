import clsx from 'clsx';
import type { TargetedEvent } from 'preact/compat';

import './styles.css';

type Props = {
  value: string;
  placeholder?: string;
  maxLength?: number;
  hasError?: boolean;
  onChange: (event: TargetedEvent<HTMLInputElement, Event>) => void;
  onFocusOut?: () => void;
};

export const Input = ({
  value,
  placeholder,
  maxLength,
  hasError = false,
  onChange,
  onFocusOut,
}: Props) => {
  return (
    <input
      className={clsx('input', {
        'input--state--error': hasError,
      })}
      type="text"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={onChange}
      onFocusOut={onFocusOut}
    />
  );
};
