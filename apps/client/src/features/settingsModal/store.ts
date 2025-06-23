import { atom } from 'nanostores';

export interface ISettingsModalStore {
  isOpened: boolean;
  isError: boolean;
}

export const $settingsModalStore = atom<ISettingsModalStore>({
  isOpened: false,
  isError: false,
});
