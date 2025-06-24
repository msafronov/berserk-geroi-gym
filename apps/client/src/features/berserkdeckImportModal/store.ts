import { atom } from 'nanostores';

export interface IBerserkdeckImportModalStore {
  isOpened: boolean;
  isLoading: boolean;
  error: string | null;
  deckId: string;
}

export const initialState = {
  isOpened: false,
  isLoading: false,
  error: null,
  deckId: '',
};

export const $berserkdeckImportModalStore = atom<IBerserkdeckImportModalStore>(initialState);
