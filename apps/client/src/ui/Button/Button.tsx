import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  size?: 'md';
  color?: 'white' | 'violett' | 'red' | 'blue';
  disabled?: boolean;
  marginTop?: 'lg';
  marginRight?: 'md';
  children: JSX.Element | JSX.Element[];
  onClick: (event: MouseEvent) => void;
};

export const Button = ({
  size,
  color = 'violett',
  disabled,
  marginTop,
  marginRight,
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
        [`button--margin-right--${marginRight}`]: marginRight,
      })}
    >
      {children}
    </button>
  );
};
