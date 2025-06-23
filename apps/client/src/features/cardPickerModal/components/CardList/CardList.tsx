import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import { Card } from '@/ui/Card/Card';

import { $cardPickerModalStore } from '../../store';
import type { CardPickerCard } from '../../store';
import { selectCardMultiSelect } from '../../actions';
import { CardWrapper } from './components/CardWrapper/CardWrapper';

import './styles.css';

export const CardList = () => {
  const { paginatedCards } = useStore($cardPickerModalStore);

  const onClick = useCallback((card: CardPickerCard) => {
    selectCardMultiSelect(card);
  }, []);

  return (
    <div className="card-picker-card-list">
      {paginatedCards.map((paginatedCard) => {
        return (
          <CardWrapper
            isActive={paginatedCard.isSelected}
            onClick={() => onClick(paginatedCard)}
          >
            <Card
              setNumber={Number(paginatedCard.setNumber)}
              cardNumber={Number(paginatedCard.cardNumber)}
            />
          </CardWrapper>
        );
      })}
    </div>
  );
};
