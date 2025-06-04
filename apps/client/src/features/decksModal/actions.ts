import { $decksModalStore } from "./store";

import {
  setLastSelectedDeckTop as databaseSetLastSelectedDeckIdTop,
  setLastSelectedDeckBottom as databaseSetLastSelectedDeckIdBottom,
} from '@/features/database/actions';

export const openDecksModal = () => {
  $decksModalStore.set({
    ...$decksModalStore.get(),
    isOpened: true,
  });
};

export const closeDecksModal = () => {
  $decksModalStore.set({
    ...$decksModalStore.get(),
    isOpened: false,
  });
};

export const setLastSelectedDeckTop = (deckId: string) => {
  databaseSetLastSelectedDeckIdTop(deckId);
};

export const setLastSelectedDeckBottom = (deckId: string) => {
  databaseSetLastSelectedDeckIdBottom(deckId);
};
