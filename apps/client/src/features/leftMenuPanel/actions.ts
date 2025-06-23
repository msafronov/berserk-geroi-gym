import { openConfirmationModal } from "@/features/confirmationModal/actions";
import { openStartScreenModal } from "@/features/startScreenModal/actions";
import { openCardPickerModal } from "@/features/cardPickerModal/actions";
import {
  addCardsToZone,
  endGame,
  startGame,
  databaseStoreToGameTableCardsMapper,
} from "@/features/gameTable/actions";

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
    onSuccess: (cards) => {
      const mappedCards = databaseStoreToGameTableCardsMapper(
        cards.map((card, index) => {
          return {
            setNumber: Number(card.setNumber),
            cardNumber: Number(card.cardNumber),
            x: index * 10,
            y: 0,
          };
        }),
        'gameZone',
        'top',
      );

      addCardsToZone(mappedCards, '_system', 'gameZone');
    },
  });
};
