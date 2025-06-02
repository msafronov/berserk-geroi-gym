import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  size?: 'md';
  color?: 'white' | 'violett' | 'red' | 'blue';
  disabled?: boolean;
  marginTop?: 'lg';
  children: JSX.Element;
  onClick: () => void;
};

export const Button = ({
  size,
  color = 'violett',
  disabled,
  marginTop,
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
      })}
    >
      {children}
    </button>
  );
};
