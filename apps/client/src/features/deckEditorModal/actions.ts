import { createDeck, getDeckById, removeDeckById, updateDeck } from "@/features/database/actions";
import type { IDatabaseStoreCard } from "@/features/database/store";
import { $deckEditorModalStore } from "./store";
import type { IDeckEditorModalSwitchItem } from './store';
import { openConfirmationModal } from "@/features/confirmationModal/actions";
import { openDecksModal } from "@/features/decksModal/actions";

export const openDeckEditorModalWithCreation = () => {
  const newDeck = createDeck();

  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    isOpened: true,
    isCreation: true,
    activeSwitchItem: 'SWITCH_ITEM_DECK',
    deck: newDeck,
  });
};

export const openDeckEditorModalForEdit = (deckId: string) => {
  const deck = getDeckById(deckId);

  if (!deck) {
    // TODO: ошибка?
    return;
  }

  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    isOpened: true,
    isCreation: false,
    activeSwitchItem: 'SWITCH_ITEM_DECK',
    deck,
  });
};

export const closeDeckEditorModal = () => {
  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    isOpened: false,
  });
};

export const setActiveSwitchItem = (activeSwitchItem: IDeckEditorModalSwitchItem) => {
  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    activeSwitchItem,
  });
};

export const removeDeck = () => {
  openConfirmationModal({
    title: `Удаление колоды "${$deckEditorModalStore.get().deck.title}"`,
    description: 'Колода будет удалена навсегда. Вы уверены?',
    onSuccess: () => {
      removeDeckById($deckEditorModalStore.get().deck.id);
      closeDeckEditorModal();
      openDecksModal();
    },
    onDecline: () => {},
  });
};

export const addCardsToDeck = (cards: IDatabaseStoreCard[]) => {
  const deck = $deckEditorModalStore.get().deck;
  const newDeck = {
    ...deck,
    deck: [
      ...deck.deck,
      ...cards,
    ],
  };

  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    deck: newDeck,
  });

  updateDeck(newDeck);
};

export const addCardsToSideboard = (cards: IDatabaseStoreCard[]) => {
  const deck = $deckEditorModalStore.get().deck;
  const newDeck = {
    ...deck,
    sideboard: [
      ...deck.sideboard,
      ...cards,
    ],
  };

  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    deck: newDeck,
  });

  updateDeck(newDeck);
};

export const removeCardFromDeck = (cardForRemove: IDatabaseStoreCard) => {
  const deck = $deckEditorModalStore.get().deck;
  const cardIndexForRemove = deck.deck.findIndex((card) => {
    return (
      card.setNumber === cardForRemove.setNumber &&
      card.cardNumber === cardForRemove.cardNumber
    );
  });

  const newDeck = {
    ...deck,
    deck: deck.deck.filter((card, cardIndex) => {
      return cardIndex !== cardIndexForRemove;
    }),
  };

  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    deck: newDeck,
  });

  updateDeck(newDeck);
};

export const removeCardFromSideboard = (cardForRemove: IDatabaseStoreCard) => {
  const deck = $deckEditorModalStore.get().deck;
  const cardIndexForRemove = deck.sideboard.findIndex((card) => {
    return (
      card.setNumber === cardForRemove.setNumber &&
      card.cardNumber === cardForRemove.cardNumber
    );
  });

  const newDeck = {
    ...deck,
    sideboard: deck.sideboard.filter((card, cardIndex) => {
      return cardIndex !== cardIndexForRemove;
    }),
  };

  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    deck: newDeck,
  });

  updateDeck(newDeck);
};

export const changeHero = (heroCard: IDatabaseStoreCard) => {
  const deck = $deckEditorModalStore.get().deck;
  const newDeck = {
    ...deck,
    hero: heroCard,
  };

  $deckEditorModalStore.set({
    ...$deckEditorModalStore.get(),
    deck: newDeck,
  });

  updateDeck(newDeck);
}

export const setTitle = (title: string) => {
  const deck = $deckEditorModalStore.get().deck;
  const newDeck = { ...deck, title };

  updateDeck(newDeck);
};

export const setDescription = (description: string) => {
  const deck = $deckEditorModalStore.get().deck;
  const newDeck = { ...deck, description };

  updateDeck(newDeck);
};
