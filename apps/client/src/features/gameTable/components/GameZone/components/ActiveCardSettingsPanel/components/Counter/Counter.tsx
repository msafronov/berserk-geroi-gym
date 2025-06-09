import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  color: 'red' | 'green' | 'black' | 'white';
  children: JSX.Element;
};

export const Counter = ({ color, children }: Props) => {
  return (
    <div
      className={clsx('game-table-card-settings-counter', {
        [`game-table-card-settings-counter--color--${color}`]: color,
      })}
    >
      {children}
    </div>
  );
};
