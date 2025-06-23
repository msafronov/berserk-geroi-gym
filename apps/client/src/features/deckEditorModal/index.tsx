import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { openDecksModal } from '@/features/decksModal/actions';
import { openCardPickerModal } from '@/features/cardPickerModal/actions';

import { $deckEditorModalStore } from './store';
import {
  closeDeckEditorModal,
  removeDeck,
  addCardsToDeck,
  addCardsToSideboard,
  removeCardFromDeck,
  removeCardFromSideboard,
  changeHero,
} from './actions';

import { DeckTitle } from './components/DeckTitle/DeckTitle';
import { DeckDescription } from './components/DeckDescription/DeckDescription';
import { Header } from './components/Header/Header';
import { DeckCards } from './components/DeckCards/DeckCards';
import { TopPanel } from './components/TopPanel/TopPanel';
import { HeroPanel } from './components/HeroPanel/HeroPanel';
import { DeckSwitch } from './components/DeckSwitch/DeckSwitch';

export const DeckEditorModal = memo(() => {
  const { isOpened, isCreation, activeSwitchItem, deck } = useStore($deckEditorModalStore);

  const onClose = useCallback(() => {
    closeDeckEditorModal();
    openDecksModal();
  }, []);

  const onRemove = useCallback(() => {
    removeDeck();
  }, []);

  const onHeroClick = useCallback(() => {
    openCardPickerModal({
      title: 'Выберите героя',
      onSuccess: (cards) => {
        const heroCard = cards[cards.length - 1];

        changeHero({ setNumber: Number(heroCard.setNumber), cardNumber: Number(heroCard.cardNumber) });
      },
    });
  }, []);

  const onDeckCardsClick = useCallback(() => {
    openCardPickerModal({
      title: 'Выберите карты (основная колода)',
      onSuccess: (cards) => {
        addCardsToDeck(
          cards.map((card) => {
            return {
              setNumber: Number(card.setNumber),
              cardNumber: Number(card.cardNumber),
            };
          }),
        );
      },
    });
  }, []);

  const onSideboardCardsClick = useCallback(() => {
    openCardPickerModal({
      title: 'Выберите карты (сайдборд)',
      onSuccess: (cards) => {
        addCardsToSideboard(
          cards.map((card) => {
            return {
              setNumber: Number(card.setNumber),
              cardNumber: Number(card.cardNumber),
            };
          }),
        );
      },
    });
  }, []);

  if (!isOpened) {
    return null;
  }

  return (
    <Modal.Wrapper size="md">
      <Modal.Header onClose={onClose}>
        <Header isCreation={isCreation} />
      </Modal.Header>

      <Modal.Body>
        <TopPanel>
          <DeckTitle />
          <DeckDescription />
        </TopPanel>

        <HeroPanel
          setNumber={deck.hero.setNumber}
          cardNumber={deck.hero.cardNumber}
          onClick={onHeroClick}
        />

        <DeckSwitch
          deckLength={deck.deck.length}
          sideboardLength={deck.sideboard.length}
        />

        {activeSwitchItem === 'SWITCH_ITEM_DECK' && (
          <DeckCards
            cards={deck.deck}
            onDeckCardsClick={onDeckCardsClick}
            onAddCard={addCardsToDeck}
            onRemoveCard={removeCardFromDeck}
          />
        )}

        {activeSwitchItem === 'SWITCH_ITEM_SIDEBOARD' && (
          <DeckCards
            cards={deck.sideboard}
            onDeckCardsClick={onSideboardCardsClick}
            onAddCard={addCardsToSideboard}
            onRemoveCard={removeCardFromSideboard}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button color="white" onClick={onClose}>
          <Text color="black">
            Закрыть
          </Text>
        </Button>

        <Button color="red" onClick={onRemove}>
          <Text color="white">
            Удалить колоду
          </Text>
        </Button>
      </Modal.Footer>
    </Modal.Wrapper>
  );
});
