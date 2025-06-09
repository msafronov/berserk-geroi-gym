import { startGame } from "@/features/gameTable/actions/index";

import { $startScreenModalStore } from "./store";

export const openStartScreenModal = () => {
  $startScreenModalStore.set({
    ...$startScreenModalStore.get(),
    isOpened: true,
  });
};

export const closeStartScreenModal = () => {
  $startScreenModalStore.set({
    ...$startScreenModalStore.get(),
    isOpened: false,
  });
};

export const start = () => {
  startGame();
};
