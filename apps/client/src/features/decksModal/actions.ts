import { $decksModalStore } from "./store";

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
