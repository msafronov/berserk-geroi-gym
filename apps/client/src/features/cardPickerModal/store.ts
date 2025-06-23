import { atom } from 'nanostores';

import { PAGINATION_LIMIT } from './const';

export type SetNumber = string;
export type CardNumber = string;

export type CardPickerCard = {
  setNumber: SetNumber;
  cardNumber: CardNumber;
  isSelected: boolean;
};

export type Pagination = {
  offset: number;
  limit: number;
};

export type OnSuccess = (selectedCards: CardPickerCard[]) => void;

export interface ICardPickerModalStore {
  title: string;
  isOpened: boolean;
  selectedSetNumber: SetNumber;
  cards: Record<SetNumber, CardPickerCard[]>;
  paginatedCards: CardPickerCard[];
  isLoadNextEnabled: boolean;
  isLoadPreviousEnabled: boolean;
  pagination: Pagination;
  selectedCardsCount:number;
  onSuccess: OnSuccess,
}

export const initialState = {
  title: '',
  isOpened: false,
  selectedSetNumber: '',
  cards: {},
  paginatedCards: [],
  isLoadNextEnabled: false,
  isLoadPreviousEnabled: false,
  pagination: {
    offset: 0,
    limit: PAGINATION_LIMIT,
  },
  selectedCardsCount: 0,
  onSuccess: () => {},
};

export const $cardPickerModalStore = atom<ICardPickerModalStore>(initialState);
