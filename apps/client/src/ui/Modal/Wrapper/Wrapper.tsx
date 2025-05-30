import type { JSX } from 'preact/jsx-runtime';
import { clsx } from 'clsx';

import './styles.css';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  children: JSX.Element | JSX.Element[];
};

export const Wrapper = ({ size = 'md', children }: Props) => {
  return (
    <div className="modal">
      <div
        className={clsx('modal-content', {
          [`modal-content--size--${size}`]: size,
        })}
      >
        {children}
      </div>
    </div>
  );
};
