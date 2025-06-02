import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const DeckListWrapper = ({ children }: Props) => {

  return (
    <div className="decks-decklist-wrapper">
      {children}
    </div>
  )
};
