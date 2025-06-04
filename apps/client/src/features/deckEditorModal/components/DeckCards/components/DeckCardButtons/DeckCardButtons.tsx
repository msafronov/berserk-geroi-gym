import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const DeckCardButtons = ({ children }: Props) => {
  return (
    <div className="deck-editor-deck-card-buttons">
      {children}
    </div>
  );
};
