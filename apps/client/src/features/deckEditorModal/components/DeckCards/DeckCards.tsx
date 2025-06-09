import { useCallback, useLayoutEffect, useState } from 'preact/hooks';
import clsx from 'clsx';

import type { IDatabaseStoreCard } from '@/features/database/store';

import { Text } from '@/ui/Text/Text';
import { Card } from '@/ui/Card/Card';
import { Button } from '@/ui/Button/Button';

import { DeckCardWrapper } from './components/DeckCardWrapper/DeckCardWrapper';
import { DeckCardButtons } from './components/DeckCardButtons/DeckCardButtons';

import './styles.css';

type Props = {
  cards: IDatabaseStoreCard[];
  onDeckCardsClick: () => void;
  onAddCard: (card: IDatabaseStoreCard) => void;
  onRemoveCard: (card: IDatabaseStoreCard) => void;
};

interface IDatabaseStoreCardWithCount extends IDatabaseStoreCard {
  count: number;
}

export const DeckCards = ({ cards, onDeckCardsClick, onAddCard, onRemoveCard }: Props) => {
  const [cardsWithCount, setCardsWithCount] = useState<IDatabaseStoreCardWithCount[]>([]);

  useLayoutEffect(() => {
    // группировка карт по "setNumber_cardNumber" -> count

    const dictionary: Record<string, number> = {};

    cards.forEach((card) => {
      const index = `${card.setNumber}_${card.cardNumber}`;

      if (dictionary[index]) {
        // @ts-ignore
        dictionary[index]++;
      } else {
        dictionary[index] = 1;
      }
    });

    // добавление сгруппированных карт в локальный state для последующего рендера

    const groupedCards: IDatabaseStoreCardWithCount[] = [];

    Object.keys(dictionary).sort().forEach((index) => {
      const [setNumber, cardNumber] = index.split('_').map(token => Number(token));

      groupedCards.push({ setNumber, cardNumber, count: dictionary[index] });
    });

    setCardsWithCount(groupedCards);
  }, [cards]);

  const onIncreaseClick = useCallback((event: MouseEvent, card: IDatabaseStoreCardWithCount) => {
    event.stopPropagation();
    onAddCard({ setNumber: card.setNumber, cardNumber: card.cardNumber });
  }, []);

  const onDecreaseClick = useCallback((event: MouseEvent, card: IDatabaseStoreCardWithCount) => {
    event.stopPropagation();
    onRemoveCard({ setNumber: card.setNumber, cardNumber: card.cardNumber });
  }, []);

  const noop = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  if (cardsWithCount.length === 0) {
    return (
      <div
        className={clsx(
          'deck-editor-deck-cards',
          'deck-editor-deck-cards--center',
        )}
        onClick={onDeckCardsClick}
      >
        <Text size="sm" color="purple">
          Нажмите, чтобы добавить карты
        </Text>
      </div>
    );
  }

  return (
    <div
      className="deck-editor-deck-cards"
      onClick={onDeckCardsClick}
    >
      {cardsWithCount.map((card) => {
        return (
          <DeckCardWrapper>
            <Card
              setNumber={card.setNumber}
              cardNumber={card.cardNumber}
            />

            <DeckCardButtons>
              <Button color="white" onClick={(event) => onDecreaseClick(event, card)}>
                <Text
                  color="black"
                  size="sm"
                >
                  -
                </Text>
              </Button>

              <Button color="white" onClick={noop}>
                <Text
                  color="black"
                  size="sm"
                  weight="bold"
                >
                  {card.count}
                </Text>
              </Button>

              <Button color="white" onClick={(event) => onIncreaseClick(event, card)}>
                <Text
                  color="black"
                  size="sm"
                >
                  +
                </Text>
              </Button>
            </DeckCardButtons>
          </DeckCardWrapper>
        );
      })}
    </div>
  );
};
