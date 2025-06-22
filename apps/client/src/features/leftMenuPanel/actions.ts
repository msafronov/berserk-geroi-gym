import { openConfirmationModal } from "@/features/confirmationModal/actions";
import { endGame, startGame } from "@/features/gameTable/actions";
import { openStartScreenModal } from "@/features/startScreenModal/actions";
import { openCardPickerModal } from "@/features/cardPickerModal/actions";

export const home = () => {
  openConfirmationModal({
    title: 'Вернуться в главное меню',
    description: 'Текущая игра будет завершена. Вы уверены?',
    onSuccess: () => {
      endGame();
      openStartScreenModal();
    },
    onDecline: () => {},
  });
};

export const startNewGame = () => {
  openConfirmationModal({
    title: 'Начать новую игру',
    description: 'Текущая игра будет завершена. Вы уверены?',
    onSuccess: () => {
      endGame();
      startGame();
    },
    onDecline: () => {},
  });
};

export const addCard = () => {
  openCardPickerModal({
    title: 'Добавить карты в игру',
    onSuccess: () => {
      //
    },
  });
};
