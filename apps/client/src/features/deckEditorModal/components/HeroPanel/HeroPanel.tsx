import { CARD_EMPTY_CARD_NUMBER, CARD_EMPTY_SET_NUMBER } from '@/features/validation/const';

import { Text } from '@/ui/Text/Text';

import { HeroCardEmpty } from './components/HeroCardEmpty/HeroCardEmpty';
import { HeroCard } from './components/HeroCard/HeroCard';

import './styles.css';

type Props = {
  setNumber: number;
  cardNumber: number;
  onClick: () => void;
};

export const HeroPanel = ({ setNumber, cardNumber, onClick }: Props) => {
  return (
    <div className="deck-editor-hero-panel">
      <Text weight="bold">
        Герой:
      </Text>

      {
        setNumber === CARD_EMPTY_SET_NUMBER || cardNumber === CARD_EMPTY_CARD_NUMBER
          ? (
            <HeroCardEmpty
              onClick={onClick}
            />
          )
          : (
            <HeroCard
              setNumber={setNumber}
              cardNumber={cardNumber}
              onClick={onClick}
            />
          )
      }
    </div>
  )
};
