import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  size?: 'md' | 'lg' | 'lg2';
  color?: 'white' | 'violett' | 'red' | 'blue';
  disabled?: boolean;
  marginTop?: 'lg';
  marginBottom?: 'md';
  marginRight?: 'md';
  padding?: 'sm' | 'sm2';
  border?: 'none';
  children: JSX.Element | JSX.Element[];
  onClick: (event: MouseEvent) => void;
};

export const Button = ({
  size,
  color = 'violett',
  disabled,
  marginTop,
  marginBottom,
  marginRight,
  padding,
  border,
  children,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx('button', {
        [`button--size--${size}`]: size,
        [`button--color--${color}`]: color,
        'button--disabled': disabled,
        [`button--margin-top--${marginTop}`]: marginTop,
        [`button--margin-bottom--${marginBottom}`]: marginBottom,
        [`button--margin-right--${marginRight}`]: marginRight,
        [`button--padding--${padding}`]: padding,
        [`button--border--${border}`]: border,
      })}
    >
      {children}
    </button>
  );
};
