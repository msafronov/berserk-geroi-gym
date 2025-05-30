import { atom } from 'nanostores';

export interface IDatabaseStoreCard {
  setNumber: number;
  cardNumber: number;
}

export interface IDatabaseStoreDeck {
  title: string;
  description: string;
  hero: IDatabaseStoreCard;
  deck: IDatabaseStoreCard[];
  sideboard: IDatabaseStoreCard[];
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

// @ts-ignore
export const $databaseStore = atom<IDatabaseStore>(_DEFAULT_USER_DATABASE_);
