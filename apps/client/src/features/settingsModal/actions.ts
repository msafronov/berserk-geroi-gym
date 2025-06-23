import { openConfirmationModal } from "@/features/confirmationModal/actions";
import { openMessageModal } from "@/features/messageModal/actions";
import { validateDatabase } from "@/features/validation/actions";
import { openStartScreenModal } from "@/features/startScreenModal/actions";
import {
  getDatabase,
  setAutoDealCardsCount,
  setDatabase,
  setInitialCoinCount,
  setName,
} from "@/features/database/actions";

import { $settingsModalStore } from "./store";

export const openSettingsModal = () => {
  $settingsModalStore.set({
    ...$settingsModalStore.get(),
    isOpened: true,
  });
};

export const closeSettingsModal = () => {
  $settingsModalStore.set({
    ...$settingsModalStore.get(),
    isOpened: false,
  });
};

export const setIsError = (isError: boolean) => {
  $settingsModalStore.set({
    ...$settingsModalStore.get(),
    isError,
  });
};

export const preImportDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    openConfirmationModal({
      title: 'Импорт БД',
      description: 'После импорта внешней Базы Данных, Ваша текущая База Данных будет безвозвратно удалена с этого устройства. Продолжить?',
      onSuccess: () => {
        resolve();
      },
      onDecline: () => {
        reject();
      },
    })
  });
};

export const importDatabase = (file: File | undefined) => {
  if (!file) {
    // TODO: системная ошибка
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      // @ts-ignore
      const jsonContent = JSON.parse(event.target.result);

      const errors = validateDatabase(jsonContent);

      if (errors.length === 0) {
        setDatabase(jsonContent);

        openMessageModal({
          title: 'Импорт БД',
          description: `База данных "${file.name}" была успешно импортирована!`,
          onSuccess: () => {
            closeSettingsModal();
            openStartScreenModal();
          },
        });
      } else {
        const errorMessages = errors
          .map((error) => {
            return `${error.code}: ${error.message}`;
          })
          .join('; ');

        openMessageModal({
          title: 'Ошибка импорта БД',
          description: `Произошли ошибки при импорте Базы Данных "${file.name}": ${errorMessages}`,
          onSuccess: () => {},
        });
      }
    } catch (error) {
      // TODO: системная ошибка
    }
  };

  reader.onerror = (error) => {
    // TODO: системная ошибка
  };

  reader.readAsText(file);
};

export const exportDatabase = () => {
  const database = getDatabase();

  const jsonStr = JSON.stringify(database);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonStr);

  const linkElement = document.createElement('a');

  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', `database_${Date.now()}.json`);

  document.body.appendChild(linkElement);

  linkElement.click();

  document.body.removeChild(linkElement);
};

export const setDatabaseName = (name: string) => {
  setName(name);
};

export const setAutoDealCardsCountSetting = (value: number) => {
  setAutoDealCardsCount(value);
};

export const setInitialCoinCountSetting = (value: number) => {
  setInitialCoinCount(value);
};