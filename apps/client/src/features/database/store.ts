import { atom } from 'nanostores';

export interface IDatabaseStoreCard {
  setNumber: number;
  cardNumber: number;
}

export interface IDatabaseStoreDeck {
  id: string;
  title: string;
  description: string;
  hero: IDatabaseStoreCard;
  deck: IDatabaseStoreCard[];
  sideboard: IDatabaseStoreCard[];
}

export interface IDatabaseStoreSettings {
  lastSelectedDeckIdTop: string;
  lastSelectedDeckIdBottom: string;
  autoDealCardsCount: number;
  initialCoinCount: number;
}

export interface IDatabaseStore {
  name: string;
  settings: IDatabaseStoreSettings,
  decks: IDatabaseStoreDeck[];
}

// @ts-ignore
// подразумевается, что база данных в памяти не будет пустой,
// поскольку будет проинициализированна перед стартом приложения
export const $databaseStore = atom<IDatabaseStore>();
