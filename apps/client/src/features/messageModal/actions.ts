import { $messageModalStore, initialState } from "./store";

export const openMessageModal = ({
  title,
  description,
  onSuccess,
}: {
  title: string;
  description: string;
  onSuccess: () => void;
}) => {
  $messageModalStore.set({
    ...initialState,
    isOpened: true,
    title,
    description,
    onSuccess,
  });
};

export const closeMessageModal = () => {
  $messageModalStore.set({
    ...initialState,
    isOpened: false,
  });
};

export const onSuccess = () => {
  $messageModalStore.get().onSuccess();
  closeMessageModal();
};
