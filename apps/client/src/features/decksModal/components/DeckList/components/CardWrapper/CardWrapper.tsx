import clsx from 'clsx';
import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  isTopDeck: boolean;
  isBottomDeck: boolean;
  children: JSX.Element[];
};

export const CardWrapper = ({ isTopDeck, isBottomDeck, children }: Props) => {

  return (
    <div
      className={clsx('decks-card-wrapper', {
        'decks-card-wrapper--color--red': isTopDeck,
        'decks-card-wrapper--color--blue': isBottomDeck,
      })}
    >
      {children}
    </div>
  )
};
