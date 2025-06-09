import { atom } from 'nanostores';

import { PAGINATION_LIMIT } from './const';

export type SetNumber = number;
export type CardNumber = number;

export type Pagination = {
  offset: number;
  limit: number;
};

export type OnSuccess = (setNumber: SetNumber, cardNumber: CardNumber) => void;

export interface ICardPickerModalStore {
  title: string;
  isOpened: boolean;
  selectedSetNumber: SetNumber;
  sets: Record<SetNumber, CardNumber[]>;
  paginatedCardNumbers: CardNumber[];
  isLoadNextEnabled: boolean;
  isLoadPreviousEnabled: boolean;
  pagination: Pagination;
  onSuccess: OnSuccess,
}

export const initialStore = {
  title: '',
  isOpened: false,
  selectedSetNumber: -1,
  sets: {},
  paginatedCardNumbers: [],
  isLoadNextEnabled: false,
  isLoadPreviousEnabled: false,
  pagination: {
    offset: 0,
    limit: PAGINATION_LIMIT,
  },
  onSuccess: () => {},
};

export const $cardPickerModalStore = atom<ICardPickerModalStore>(initialStore);
