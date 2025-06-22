import { $confirmationModalStore, initialState } from "./store";

export const openConfirmationModal = ({
  title,
  description,
  onSuccess,
  onDecline,
}: {
  title: string;
  description: string;
  onSuccess: () => void;
  onDecline: () => void;
}) => {
  $confirmationModalStore.set({
    ...initialState,
    isOpened: true,
    title,
    description,
    onSuccess,
    onDecline,
  });
};

export const closeConfirmationModal = () => {
  $confirmationModalStore.set({
    ...initialState,
    isOpened: false,
  });
};

export const onSuccess = () => {
  $confirmationModalStore.get().onSuccess();
  closeConfirmationModal();
};

export const onDecline = () => {
  $confirmationModalStore.get().onDecline();
  closeConfirmationModal();
};
