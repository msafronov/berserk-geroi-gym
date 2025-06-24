import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const BerserkdeckButton = ({ children }: Props) => {
  return (
    <div className="decks-card-berserkdeck-button">
      {children}
    </div>
  )
};
