import { useStore } from '@nanostores/preact';

import { Card } from '@/ui/Card/Card';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { $databaseStore } from '@/features/database/store';

import { DeckListWrapper } from './components/DeckListWrapper/DeckListWrapper';
import { Deck } from './components/Deck/Deck';
import { CardWrapper } from './components/CardWrapper/CardWrapper';
import { CardWrapperButtons } from './components/CardWrapperButtons/CardWrapperButtons';
import { DeckDescription } from './components/DeckDescription/DeckDescription';
import { setLastSelectedDeckBottom, setLastSelectedDeckTop } from '../../actions';

type Props = {
  onDeckEdit: (deckId: string) => void;
};

export const DeckList = ({ onDeckEdit }: Props) => {
  const {
    decks,
    settings: {
      lastSelectedDeckIdTop,
      lastSelectedDeckIdBottom,
    },
  } = useStore($databaseStore);

  return (
    <DeckListWrapper>
      {decks.map((deck) => {
        const isTopDeck = lastSelectedDeckIdTop === deck.id;
        const isBottomDeck = lastSelectedDeckIdBottom === deck.id;

        return (
          <Deck>
            <CardWrapper isTopDeck={isTopDeck} isBottomDeck={isBottomDeck}>
              <Card
                setNumber={deck.hero.setNumber}
                cardNumber={deck.hero.cardNumber}
              />

              <CardWrapperButtons>
                <Button onClick={() => setLastSelectedDeckTop(deck.id)} color="red">
                  <Text
                    size="sm"
                    weight={isTopDeck ? 'bold' : undefined}
                  >
                    Колода наверху
                  </Text>
                </Button>

                <Button onClick={() => setLastSelectedDeckBottom(deck.id)} color="blue">
                  <Text
                    size="sm"
                    weight={isBottomDeck ? 'bold' : undefined}
                  >
                    Колода внизу
                  </Text>
                </Button>

                <Button onClick={() => onDeckEdit(deck.id)}>
                  <Text
                    size="sm"
                    color="white"
                  >
                    Редактировать
                  </Text>
                </Button>
              </CardWrapperButtons>
            </CardWrapper>

            <DeckDescription>
              <Text weight="bold" overflow="elipsis">{deck.title}</Text>
              <Text>{`${deck.deck.length} / ${deck.sideboard.length}`}</Text>

              {isTopDeck && (
                <Text weight="bold" color="red">Колода наверху</Text>
              )}

              {isBottomDeck && (
                <Text weight="bold" color="blue">Колода внизу</Text>
              )}
            </DeckDescription>
          </Deck>
        );
      })}
    </DeckListWrapper>
  );
};