import { downloadList } from "card-images-downloader";

import { $cardPickerModalStore, initialState } from "./store";
import type { CardPickerCard, OnSuccess, SetNumber } from './store';

export const openCardPickerModal = ({ title, onSuccess }: { title: string, onSuccess: OnSuccess }) => {
  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    title,
    onSuccess,
    isOpened: true,
  });
};

export const closeCardPickerModal = () => {
  $cardPickerModalStore.set({
    ...initialState,
  });
};

export const init = () => {
  const cards: Record<string, CardPickerCard[]> = {};

  for (let downloadListItem of downloadList) {
    const currentSetNumber = downloadListItem.setNumber.toString();

    cards[currentSetNumber] = [];

    for (let currentCardNumber = downloadListItem.minCardNumber; currentCardNumber <= downloadListItem.maxCardNumber; currentCardNumber++) {
      if (downloadListItem.notExistCardNumbers.includes(currentCardNumber)) {
        continue;
      }

      cards[currentSetNumber].push({
        setNumber: currentSetNumber,
        cardNumber: currentCardNumber.toString(),
        isSelected: false,
      });
    }
  }

  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    selectedSetNumber: downloadList[0].setNumber.toString(),
    cards,
  });

  loadInit();
};

export const changeSelectedSetNumber = (selectedSetNumber: SetNumber) => {
  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    selectedSetNumber,
  });

  loadInit();
};

export const loadCards = (offset: number) => {
  const { cards, selectedSetNumber, pagination: { limit } } = $cardPickerModalStore.get();

  const setCards = cards[selectedSetNumber];

  if (!setCards) {
    // TODO: системная ошибка
    return;
  }

  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    isLoadPreviousEnabled: (offset - limit) >= 0,
    isLoadNextEnabled: (offset + limit) < setCards.length,
    paginatedCards: setCards.slice(offset, offset + limit),
    pagination: {
      offset,
      limit,
    },
  });
};

export const loadInit = () => {
  loadCards(0);
};

export const loadCurrent = () => {
  const { pagination: { offset } } = $cardPickerModalStore.get();

  loadCards(offset);
};

export const loadPrevious = () => {
  const { pagination: { offset, limit } } = $cardPickerModalStore.get();

  loadCards(offset - limit);
};

export const loadNext = () => {
  const { pagination: { offset, limit } } = $cardPickerModalStore.get();

  loadCards(offset + limit);
};

export const selectCardMultiSelect = (cardPickerCard: CardPickerCard) => {
  const { cards } = $cardPickerModalStore.get();

  if (!cards[cardPickerCard.setNumber]) {
    // TODO: системная ошибка
    return;
  }

  const cardIndex = Number(cardPickerCard.cardNumber) - 1;

  const newIsSelected = !cards[cardPickerCard.setNumber][cardIndex].isSelected;

  cards[cardPickerCard.setNumber][cardIndex].isSelected = newIsSelected;

  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    selectedCardsCount: newIsSelected
      ? $cardPickerModalStore.get().selectedCardsCount + 1
      : $cardPickerModalStore.get().selectedCardsCount - 1,
    cards,
  });

  loadCurrent();
};

export const onConfirm = () => {
  const { cards, onSuccess } = $cardPickerModalStore.get();

  const selectedCards: CardPickerCard[] = [];

  Object.keys(cards).filter((setNumber) => {
    cards[setNumber].forEach((card) => {
      if (!card.isSelected) {
        return;
      }

      selectedCards.push(card);
    });
  });

  onSuccess(selectedCards);
};
