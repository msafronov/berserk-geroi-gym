import clsx from 'clsx';
import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  isActive?: boolean;
  size?: 'sm' | 'lg';
  borderRight?: 'sm';
  children: JSX.Element | JSX.Element[];
  onClick?: () => void;
  onDragStart?: (event: DragEvent) => void;
  onDrop?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
}

export const Wrapper = ({
  isActive = false,
  size = 'sm',
  borderRight,
  children,
  onClick,
  onDragStart,
  onDrop,
  onDragOver,
}: Props) => {
  return (
    <div
      className={clsx('game-table-zone', {
        'game-table-zone--active': isActive,
        'game-table-zone--clickable': onClick,
        [`game-table-zone--size--${size}`]: size,
        [`game-table-zone--border-right--${borderRight}`]: borderRight,
      })}
      onClick={onClick}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {children}
    </div>
  );
};
