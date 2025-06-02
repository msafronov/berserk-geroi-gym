import { getItem, setItem } from "@/features/localStorage/actions";

import { LOCAL_STORAGE_KEY_DB } from "./const";
import type { IDatabaseStore } from "./store";
import { $databaseStore } from "./store";

const saveUserDatabaseToLocalStorage = () => {
  setItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB, $databaseStore.get());
};

export const initializeUserDatabase = (): void => {
  const existingDatabaseFromLocalStorage = getItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB);

  if (existingDatabaseFromLocalStorage) {
    $databaseStore.set(existingDatabaseFromLocalStorage);
  } else {
    // @ts-ignore
    $databaseStore.set(_DEFAULT_USER_DATABASE_);
    // @ts-ignore
    setItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB, _DEFAULT_USER_DATABASE_);
  }
};

export const setLastSelectedDeckIdTop = (deckId: number) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    settings: {
      ...databaseStore.settings,
      lastSelectedDeckIdTop: deckId,
    },
  });

  saveUserDatabaseToLocalStorage();
};

export const setLastSelectedDeckIdBottom = (deckId: number) => {
  const databaseStore = $databaseStore.get();

  $databaseStore.set({
    ...databaseStore,
    settings: {
      ...databaseStore.settings,
      lastSelectedDeckIdBottom: deckId,
    },
  });

  saveUserDatabaseToLocalStorage();
};