import { getItem, setItem } from "@/features/localStorage/actions";

import { LOCAL_STORAGE_KEY_DB } from "./const";
import type { IDatabaseStore, IDatabaseStoreDeck } from "./store";
import { $databaseStore } from "./store";

export const loadDatabaseFromLocalStorage = (): IDatabaseStore | null => {
  return getItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB);
};

export const saveDatabaseToLocalStorage = (): void => {
  setItem<IDatabaseStore>(LOCAL_STORAGE_KEY_DB, $databaseStore.get());
};

export const getLastSelectedDeckIdSideA = (): IDatabaseStoreDeck | null => {
  const database = $databaseStore.get();

  return database.decks[database.settings.lastSelectedDeckIdSideA] || null;
};

export const getLastSelectedDeckIdSideB = (): IDatabaseStoreDeck | null => {
  const database = $databaseStore.get();

  return database.decks[database.settings.lastSelectedDeckIdSideB] || null;
};
