import { atom } from 'nanostores';

export interface IDatabaseStoreCard {
  setNumber: number;
  cardNumber: number;
}

export interface IDatabaseStoreDeck {
  title: string;
  hero: IDatabaseStoreCard;
  cards: IDatabaseStoreCard[];
}

export interface IDatabaseStoreSettings {
  lastSelectedDeckIdSideA: number;
  lastSelectedDeckIdSideB: number;
}

export interface IDatabaseStore {
  name: string;
  settings: IDatabaseStoreSettings,
  decks: IDatabaseStoreDeck[];
}

export const $databaseStore = atom<IDatabaseStore>({
  name: '<DEFAULT_USER>',
  settings: {
    lastSelectedDeckIdSideA: 0,
    lastSelectedDeckIdSideB: 1,
  },
  decks: [],
});
