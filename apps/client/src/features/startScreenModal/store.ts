import { atom } from 'nanostores';

export interface IStartScreenModalStore {
  isOpened: boolean;
}

export const $startScreenModalStore = atom<IStartScreenModalStore>({
  isOpened: false,
});
