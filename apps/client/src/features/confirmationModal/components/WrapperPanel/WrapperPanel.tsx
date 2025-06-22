import type { JSX } from 'preact/jsx-runtime';

import './styles.css';
import clsx from 'clsx';

type Props = {
  borderLeft?: boolean;
  children: JSX.Element | JSX.Element[];
};

export const WrapperPanel = ({ borderLeft, children }: Props) => {
  return (
    <div
      className={clsx('start-screen-modal-panel', {
        'start-screen-modal-panel--border-left': borderLeft,
      })}
    >
      {children}
    </div>
  );
};
