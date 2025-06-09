import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AdditionalInfo = ({ children }: Props) => {
  return (
    <div className="game-table-zone-title-additional-info">
      {children}
    </div>
  );
};
