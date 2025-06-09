import { useStore } from '@nanostores/preact';

import { Card } from '@/ui/Card/Card';
import { $gameTableStore } from '@/features/gameTable/store';

import './styles.css';

export const Wrapper = () => {
  const { activeGameTableCard } = useStore($gameTableStore);

  if (!activeGameTableCard) {
    return null;
  }

  if (activeGameTableCard.isFaceDown) {
    return null;
  }

  if (activeGameTableCard.type !== 'card') {
    return null;
  }

  return (
    <div
      className="active-card-zoom"
    >
      <Card
        size="lg2"
        setNumber={activeGameTableCard.setNumber}
        cardNumber={activeGameTableCard.cardNumber}
      />
    </div>
  );
};
