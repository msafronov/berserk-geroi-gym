import { atom } from 'nanostores';

export interface IConfirmationModalStore {
  isOpened: boolean;
  title: string;
  description: string;
  onSuccess: () => void;
  onDecline: () => void;
}

export const initialState = {
  isOpened: false,
  title: '',
  description: '',
  onSuccess: () => {},
  onDecline: () => {},
};

export const $confirmationModalStore = atom<IConfirmationModalStore>(initialState);
