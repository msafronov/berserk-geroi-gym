import { downloadList } from "card-images-downloader";

import { $cardPickerModalStore, initialStore } from "./store";
import type { CardNumber, OnSuccess, SetNumber } from './store';

export const openCardPickerModal = ({ title, onSuccess }: { title: string, onSuccess: OnSuccess }) => {
  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    title,
    onSuccess,
    isOpened: true,
  });
};

export const closeCardPickerModal = () => {
  $cardPickerModalStore.set(initialStore);
};

export const init = () => {
  const sets: Record<SetNumber, CardNumber[]> = {};

  for (let downloadListItem of downloadList) {
    sets[downloadListItem.setNumber] = [];

    for (let currentCardNumber = downloadListItem.minCardNumber; currentCardNumber <= downloadListItem.maxCardNumber; currentCardNumber++) {
      if (downloadListItem.notExistCardNumbers.includes(currentCardNumber)) {
        continue;
      }

      sets[downloadListItem.setNumber].push(currentCardNumber);
    }
  }

  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    selectedSetNumber: downloadList[0].setNumber,
    sets,
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
  const { sets, selectedSetNumber, pagination: { limit } } = $cardPickerModalStore.get();
  const selectedSetCards = sets[selectedSetNumber];

  if (!selectedSetCards) {
    // TODO: системная ошибка
    return;
  }

  $cardPickerModalStore.set({
    ...$cardPickerModalStore.get(),
    isLoadPreviousEnabled: (offset - limit) >= 0,
    isLoadNextEnabled: (offset + limit) < selectedSetCards.length,
    paginatedCardNumbers: sets[selectedSetNumber].slice(offset, offset + limit),
    pagination: {
      offset,
      limit,
    },
  });
};

export const loadInit = () => {
  loadCards(0);
};

export const loadPrevious = () => {
  const { pagination: { offset, limit } } = $cardPickerModalStore.get();

  loadCards(offset - limit);
};

export const loadNext = () => {
  const { pagination: { offset, limit } } = $cardPickerModalStore.get();

  loadCards(offset + limit);
};

export const selectCard = (cardNumber: CardNumber) => {
  const { selectedSetNumber, onSuccess } = $cardPickerModalStore.get();

  onSuccess(selectedSetNumber, cardNumber);
};
