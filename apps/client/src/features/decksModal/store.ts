import { atom } from 'nanostores';

export interface IDecksModalStore {
  isOpened: boolean;
}

export const $decksModalStore = atom<IDecksModalStore>({
  isOpened: false,
});
