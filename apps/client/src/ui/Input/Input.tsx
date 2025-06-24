import { useCallback } from 'preact/compat';
import type { TargetedEvent } from 'preact/compat';
import clsx from 'clsx';

import './styles.css';

type Props = {
  type?: 'text' | 'number';
  value: string | number;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  hasError?: boolean;
  size?: 'sm';
  onChange: (value: string | number) => void;
  onFocusOut?: () => void;
};

export const Input = ({
  type = 'text',
  value,
  placeholder,
  minLength,
  maxLength,
  min,
  max,
  hasError = false,
  size,
  onChange,
  onFocusOut,
}: Props) => {
  const onChangeHandler = useCallback((event: TargetedEvent<HTMLInputElement, Event>) => {
    // @ts-ignore
    onChange(event.target.value);
  }, []);

  return (
    <input
      type={type}
      className={clsx('input', {
        'input--state--error': hasError,
        [`input--size--${size}`]: size,
      })}
      value={value}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      onChange={onChangeHandler}
      onFocusOut={onFocusOut}
    />
  );
};
