import type { JSX } from 'preact/jsx-runtime';

import './styles.css';
import clsx from 'clsx';

type Props = {
  isActive?: boolean;
  children: JSX.Element;
  onClick: (event: MouseEvent) => void;
};

export const CardWrapper = ({
  isActive,
  children,
  onClick
}: Props) => {
  return (
    <div
      className={clsx('card-picker-card-wrapper', {
        'card-picker-card-wrapper--active': isActive,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
