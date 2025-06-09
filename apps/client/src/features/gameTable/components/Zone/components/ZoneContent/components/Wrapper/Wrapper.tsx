import type { JSX } from 'preact/jsx-runtime';
import clsx from 'clsx';

import './styles.css';

type Props = {
  orientation?: 'horizontal',
  isActive?: boolean;
  children?: JSX.Element | JSX.Element[] | null;
}

export const Wrapper = ({
  orientation,
  isActive = false,
  children,
}: Props) => {
  return (
    <div
      className={clsx('game-table-zone-content', {
        'game-table-zone-content--active': isActive,
        [`game-table-zone-content--orientation--${orientation}`]: orientation,
      })}
    >
      {children}
    </div>
  );
};
