import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element;
};

export const MenuButton = ({ children }: Props) => {
  return (
    <div
      className="game-table-zone-active-card-menu-button"
    >
      {children}
    </div>
  );
};
