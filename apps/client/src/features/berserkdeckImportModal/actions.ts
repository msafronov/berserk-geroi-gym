import { createDeck } from "@/features/database/actions";
import type { IDatabaseStoreDeck } from "@/features/database/store";
import { validateDeck } from "@/features/validation/actions";

import { $berserkdeckImportModalStore, initialState } from "./store";

export const openBerserkdeckImportModal = () => {
  $berserkdeckImportModalStore.set({
    ...initialState,
    isOpened: true,
  });
};

export const closeBerserkdeckImportModal = () => {
  $berserkdeckImportModalStore.set({
    ...initialState,
    isOpened: false,
  });
};

export const setError = (error: string | null) => {
  $berserkdeckImportModalStore.set({
    ...$berserkdeckImportModalStore.get(),
    error,
  });
};

export const setDeckURL = (deckURL: string) => {
  const hasError = !/^(http|https):\/\/berserkdeck\.ru\/decks\/[0-9]{1,6}$/.test(deckURL);

  if (hasError) {
    setError('Неправильная ссылка');
    return;
  }

  const valueSplitted = deckURL.split('/');
  const deckId = valueSplitted[valueSplitted.length - 1];

  setError(null);

  $berserkdeckImportModalStore.set({
    ...$berserkdeckImportModalStore.get(),
    deckId,
  });
};

export const setIsLoading = (isLoading: boolean) => {
  $berserkdeckImportModalStore.set({
    ...$berserkdeckImportModalStore.get(),
    isLoading,
  });
};

export const importDeck = () => {
  setIsLoading(true);

  const { deckId } = $berserkdeckImportModalStore.get();

  // @ts-ignore
  fetch(_CONFIG_.deckImportURL, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ id: deckId }),
  })
    .then(async (response) => {
      setIsLoading(false);

      if (!response.ok) {
        setError(`Ошибка запроса: ${response.status || 0} ${response.statusText}`);
        return;
      }

      // TODO: импорт колоды
      const importedDeck = (await response.json()) as IDatabaseStoreDeck;
      const errors = validateDeck(importedDeck);

      if (errors.length) {
        const errorMessages = errors
          .map((error) => {
            return `${error.code}: ${error.message}`;
          })
          .join('; ');

        setError(`Произошли ошибки при импорте колоды с berserkdeck.ru": ${errorMessages}`);
        return;
      }

      createDeck(importedDeck);
      closeBerserkdeckImportModal();
    })
    .catch((error) => {
      setIsLoading(false);
      setError(`Ошибка запроса: ${error}`);
    });
};
