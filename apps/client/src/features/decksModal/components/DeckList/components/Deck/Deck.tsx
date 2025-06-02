import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const Deck = ({ children }: Props) => {

  return (
    <div className="decks-deck">
      {children}
    </div>
  )
};
