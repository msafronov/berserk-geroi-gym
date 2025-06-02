import { $decksModalStore } from "./store";

import {
  setLastSelectedDeckIdTop as databaseSetLastSelectedDeckIdTop,
  setLastSelectedDeckIdBottom as databaseSetLastSelectedDeckIdBottom,
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

export const setLastSelectedDeckIdTop = (deckId: number) => {
  databaseSetLastSelectedDeckIdTop(deckId);
};

export const setLastSelectedDeckIdBottom = (deckId: number) => {
  databaseSetLastSelectedDeckIdBottom(deckId);
};
