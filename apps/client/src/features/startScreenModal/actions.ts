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
