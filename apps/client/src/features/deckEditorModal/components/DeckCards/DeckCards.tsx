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
    // TODO: происходит баг с изменением порядка карт при increase / decrease

    // группировка карт по setNumber -> cardNumber -> count

    const dictionary = new Map<number, Map<number, number>>();

    cards.forEach((card) => {
      if (dictionary.has(card.setNumber)) {
        // @ts-ignore
        if (dictionary.get(card.setNumber).has(card.cardNumber)) {
          // @ts-ignore
          dictionary.get(card.setNumber).set(
            card.cardNumber,
            // @ts-ignore
            dictionary.get(card.setNumber).get(card.cardNumber) + 1,
          );
        } else {
          // @ts-ignore
          dictionary.get(card.setNumber).set(card.cardNumber, 1);
        }
      } else {
        dictionary.set(card.setNumber, new Map().set(card.cardNumber, 1));
      }
    });

    // добавление сгруппированных карт в локальный state для последующего рендера

    const groupedCards: IDatabaseStoreCardWithCount[] = [];

    for (let [setNumber, cardNumberToCountMap] of dictionary) {
      for (let [cardNumber, count] of cardNumberToCountMap) {
        groupedCards.push({ setNumber, cardNumber, count });
      }
    }

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
