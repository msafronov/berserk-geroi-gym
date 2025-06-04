import { Card } from '@/ui/Card/Card';

import './styles.css';

type Props = {
  setNumber: number;
  cardNumber: number;
  onClick: () => void;
};

export const HeroCard = ({ setNumber, cardNumber, onClick }: Props) => {
  return (
    <div
      className="deck-editor-hero-card"
      onClick={onClick}
    >
      <Card
        setNumber={setNumber}
        cardNumber={cardNumber}
      />
    </div>
  );
};
