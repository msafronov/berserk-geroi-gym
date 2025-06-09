import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
}

export const CardWrapper = ({ children }: Props) => {
  return (
    <div
      className="game-table-zone-card-wrapper"
    >
      {children}
    </div>
  );
};
