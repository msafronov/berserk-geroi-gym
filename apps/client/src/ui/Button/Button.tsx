import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  size?: 'md';
  color?: 'white' | 'violett';
  disabled?: boolean;
  marginTop?: 'lg';
  children: JSX.Element;
};

export const Button = ({
  size,
  color = 'white',
  disabled,
  marginTop,
  children,
}: Props) => {
  return (
    <button
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
