import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: (JSX.Element | boolean)[];
};

export const DeckDescription = ({ children }: Props) => {

  return (
    <div className="decks-deck-desctiption">
      {children}
    </div>
  )
};
