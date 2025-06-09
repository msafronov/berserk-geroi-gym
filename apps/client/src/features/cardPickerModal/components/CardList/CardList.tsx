import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import { Card } from '@/ui/Card/Card';

import { $cardPickerModalStore } from '../../store';
import { closeCardPickerModal, selectCard } from '../../actions';
import { CardWrapper } from './components/CardWrapper/CardWrapper';

import './styles.css';

export const CardList = () => {
  const { selectedSetNumber, paginatedCardNumbers } = useStore($cardPickerModalStore);

  const onClick = useCallback((cardNumber: number) => {
    selectCard(cardNumber);
    closeCardPickerModal();
  }, []);

  return (
    <div className="card-picker-card-list">
      {paginatedCardNumbers.map((cardNumber) => {
        return (
          <CardWrapper
            onClick={() => onClick(cardNumber)}
          >
            <Card
              setNumber={selectedSetNumber}
              cardNumber={cardNumber}
            />
          </CardWrapper>
        );
      })}
    </div>
  );
};
