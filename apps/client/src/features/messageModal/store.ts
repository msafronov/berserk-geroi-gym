import { atom } from 'nanostores';

export interface IMessageModalStore {
  isOpened: boolean;
  title: string;
  description: string;
  onSuccess: () => void;
}

export const initialState = {
  isOpened: false,
  title: '',
  description: '',
  onSuccess: () => {},
};

export const $messageModalStore = atom<IMessageModalStore>(initialState);
