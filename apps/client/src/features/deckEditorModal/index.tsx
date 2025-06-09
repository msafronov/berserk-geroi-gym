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
  addCardToDeck,
  addCardToSideboard,
  removeCardFromDeck,
  removeCardFromSideboard,
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
    closeDeckEditorModal();
    openDecksModal();
  }, []);

  const onHeroClick = useCallback(() => {
    openCardPickerModal({
      title: 'Выберите героя',
      onSuccess: (...args) => console.log('>>> onHeroClick', ...args),
    });
  }, []);

  const onDeckCardsClick = useCallback(() => {
    openCardPickerModal({
      title: 'Выберите карту (основная колода)',
      onSuccess: (...args) => console.log('>>> onDeckCardsClick', ...args),
    });
  }, []);

  const onSideboardCardsClick = useCallback(() => {
    openCardPickerModal({
      title: 'Выберите карту (сайдборд)',
      onSuccess: (...args) => console.log('>>> onSideboardCardsClick', ...args),
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
            onAddCard={addCardToDeck}
            onRemoveCard={removeCardFromDeck}
          />
        )}

        {activeSwitchItem === 'SWITCH_ITEM_SIDEBOARD' && (
          <DeckCards
            cards={deck.sideboard}
            onDeckCardsClick={onSideboardCardsClick}
            onAddCard={addCardToSideboard}
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
