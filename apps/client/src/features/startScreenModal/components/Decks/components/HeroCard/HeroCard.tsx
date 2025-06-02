import { Card } from '@/ui/Card/Card';

import './styles.css';
import clsx from 'clsx';

type Props = {
  setNumber: number;
  cardNumber: number;
  isTopDeck?: boolean;
  isBottomDeck?: boolean;
  onClick: () => void;
};

export const HeroCard = ({ setNumber, cardNumber, isTopDeck, isBottomDeck, onClick }: Props) => {
  return (
    <div
      className={clsx('start-screen-modal-hero-card', {
        'decks-card-wrapper--color--red': isTopDeck,
        'decks-card-wrapper--color--blue': isBottomDeck,
      })}
      onClick={onClick}
    >
      <Card
        setNumber={setNumber}
        cardNumber={cardNumber}
      />
    </div>
  );
};
