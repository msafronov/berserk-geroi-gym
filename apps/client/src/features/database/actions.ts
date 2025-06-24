import { nanoid } from "nanoid";
import { getItem, setItem } from "@/features/localStorage/actions";
import { CARD_EMPTY_CARD_NUMBER, CARD_EMPTY_SET_NUMBER } from '@/features/validation/const';

import { LOCAL_STORAGE_KEY_DB } from "./const";
import type { IDatabaseStore, IDatabaseStoreDeck, IDatabaseStoreSettings } from "./store";
import { $databaseStore } from "./store";

const saveUserDatabaseToLocalStorage = () => {
  setItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB, $databaseStore.get());
};

export const initializeUserDatabase = (): void => {
  const existingDatabaseFromLocalStorage = getItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB);

  if (existingDatabaseFromLocalStorage) {
    $databaseStore.set(existingDatabaseFromLocalStorage);
  } else {
    // @ts-ignore
    $databaseStore.set(_DEFAULT_USER_DATABASE_);
    // @ts-ignore
    setItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB, _DEFAULT_USER_DATABASE_);
  }
};

export const getDatabase = (): IDatabaseStore => {
  return $databaseStore.get();
};

export const setDatabase = (database: IDatabaseStore) => {
  setItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB, database);
  initializeUserDatabase();
};

export const getSettings = (): IDatabaseStoreSettings => {
  return $databaseStore.get().settings;
};

export const getLastSelectedDeckTop = (): IDatabaseStoreDeck | null => {
  return getDeckById($databaseStore.get().settings.lastSelectedDeckIdTop);
};

export const setLastSelectedDeckTop = (deckId: string) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    settings: {
      ...databaseStore.settings,
      lastSelectedDeckIdTop: deckId,
    },
  });

  saveUserDatabaseToLocalStorage();
};

export const getLastSelectedDeckBottom = (): IDatabaseStoreDeck | null => {
  return getDeckById($databaseStore.get().settings.lastSelectedDeckIdBottom);
};

export const setLastSelectedDeckBottom = (deckId: string) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    settings: {
      ...databaseStore.settings,
      lastSelectedDeckIdBottom: deckId,
    },
  });

  saveUserDatabaseToLocalStorage();
};

export const setName = (name: string) => {
  $databaseStore.set({
    ...$databaseStore.get(),
    name,
  });

  saveUserDatabaseToLocalStorage();
};

export const setAutoDealCardsCount = (autoDealCardsCount: number) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    settings: {
      ...databaseStore.settings,
      autoDealCardsCount,
    },
  });

  saveUserDatabaseToLocalStorage();
};

export const setInitialCoinCount = (initialCoinCount: number) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    settings: {
      ...databaseStore.settings,
      initialCoinCount,
    },
  });

  saveUserDatabaseToLocalStorage();
};

export const createDeck = (deckData?: IDatabaseStoreDeck): IDatabaseStoreDeck => {
  const databaseStore = $databaseStore.get();

  const newDeck = {
    id: nanoid(),
    title: 'Без названия',
    description: '',
    hero: { setNumber: CARD_EMPTY_SET_NUMBER, cardNumber: CARD_EMPTY_CARD_NUMBER },
    deck: [],
    sideboard: [],
    ...deckData,
  };

  $databaseStore.set({
    ...databaseStore,
    decks: [
      ...databaseStore.decks,
      newDeck,
    ],
  });

  saveUserDatabaseToLocalStorage();

  return { ...newDeck };
};

export const getDeckById = (deckId: string): IDatabaseStoreDeck | null => {
  return $databaseStore.get().decks.find((deck) => {
    return deck.id === deckId;
  }) || null;
};

export const removeDeckById = (deckIdForRemove: string) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    decks: databaseStore.decks.filter((deck) => {
      return deck.id !== deckIdForRemove;
    }),
  });

  saveUserDatabaseToLocalStorage();
};

export const updateDeck = (deckForUpdate: IDatabaseStoreDeck) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    decks: databaseStore.decks.map((deck) => {
      if (deck.id === deckForUpdate.id) {
        return deckForUpdate;
      }

      return deck;
    }),
  });

  saveUserDatabaseToLocalStorage();
};
