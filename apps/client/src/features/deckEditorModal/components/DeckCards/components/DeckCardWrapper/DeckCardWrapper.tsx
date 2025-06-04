import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const DeckCardWrapper = ({ children }: Props) => {
  return (
    <div className="deck-editor-deck-card-wrapper">
      {children}
    </div>
  );
};
