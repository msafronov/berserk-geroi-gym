import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  size: 'sm' | 'lg';
  children: JSX.Element | JSX.Element[];
}

export const WrapperPanel = ({ size, children }: Props) => {
  return (
    <div
      className={clsx('game-table-wrapper-panel', {
        [`game-table-wrapper-panel--size--${size}`]: size,
      })}
    >
      {children}
    </div>
  );
};
