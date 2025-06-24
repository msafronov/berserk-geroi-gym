import type { IDatabaseStore, IDatabaseStoreDeck } from "@/features/database/store";
import type { ValidationError, ValidationErrorCode } from "./store";

import {
  DATABASE_NAME_LENGTH_MIN,
  DATABASE_NAME_LENGTH_MAX,
  DECK_TITLE_LENGTH_MIN,
  DECK_TITLE_LENGTH_MAX,
  DECK_DESCRIPTION_LENGTH_MIN,
  DECK_DESCRIPTION_LENGTH_MAX,
  SETTING_AUTO_DEAL_CARDS_COUNT_MIN,
  SETTING_AUTO_DEAL_CARDS_COUNT_MAX,
  SETTING_INITIAL_COINT_COUNT_MIN,
  SETTING_INITIAL_COINT_COUNT_MAX,
} from "./const";

type IValidation = (value: any) => ValidationError | null;

const validationErrorCodeMap: Record<ValidationErrorCode, string> = {
  DATABASE_STRUCTURE_INVALID: 'Файл БД поврежден или имеет неверный формат :(',
  DATABASE_NAME_INVALID: `Должно быть строкой из русских / английских букв или чисел или _ или пробела в диапазоне от ${DATABASE_NAME_LENGTH_MIN} до ${DATABASE_NAME_LENGTH_MAX}`,
  LAST_SELECTED_ID_TOP_INVALID: 'Должно быть строкой 21 символов A-Za-z0-9_-',
  LAST_SELECTED_ID_BOTTOM_INVALID: 'Должно быть строкой 21 символов A-Za-z0-9_-',
  SETTING_AUTO_DEAL_CARDS_COUNT_INVALID: `Должно быть числом в диапазоне от ${SETTING_AUTO_DEAL_CARDS_COUNT_MIN} до ${SETTING_AUTO_DEAL_CARDS_COUNT_MAX}`,
  SETTING_INITIAL_COIN_COUNT_INVALID: `Должно быть числом в диапазоне от ${SETTING_INITIAL_COINT_COUNT_MIN} до ${SETTING_INITIAL_COINT_COUNT_MAX}`,
  DECK_ID_INVALID: 'Должно быть строкой 21 символов A-Za-z0-9_-',
  DECK_TITLE_INVALID: `Должно быть строкой из русских / английских букв или чисел или _ или пробела в диапазоне от ${DECK_TITLE_LENGTH_MIN} до ${DECK_TITLE_LENGTH_MAX}`,
  DECK_DESCRIPTION_INVALID: `Должно быть строкой из русских / английских букв или чисел или _ или пробела в диапазоне от ${DECK_DESCRIPTION_LENGTH_MIN} до ${DECK_DESCRIPTION_LENGTH_MAX}`,
  DECK_HERO_SET_NUMBER_INVALID: 'Должно быть числом от 0 до 999',
  DECK_HERO_CARD_NUMBER_INVALID: 'Должно быть числом от 0 до 999',
  DECK_DECK_SET_NUMBER_INVALID: 'Должно быть числом от 0 до 999',
  DECK_DECK_CARD_NUMBER_INVALID: 'Должно быть числом от 0 до 999',
  DECK_SIDEBOARD_SET_NUMBER_INVALID: 'Должно быть числом от 0 до 999',
  DECK_SIDEBOARD_CARD_NUMBER_INVALID: 'Должно быть числом от 0 до 999',
};

export const createValidationError = (validationErrorCode: ValidationErrorCode): ValidationError => {
  return {
    code: validationErrorCode,
    message: validationErrorCodeMap[validationErrorCode],
  }
};

export const validateDatabase = (database: IDatabaseStore): ValidationError[] => {
  const errors: (ValidationError | null)[] = [];

  try {
    errors.push(validateDatabaseName(database.name));
    errors.push(validateLastSelectedDeckIdTopSetting(database.settings.lastSelectedDeckIdTop));
    errors.push(validateLastSelectedDeckIdBottomSetting(database.settings.lastSelectedDeckIdBottom));
    errors.push(validateAutoDealCardCountSetting(database.settings.autoDealCardsCount));
    errors.push(validateInitialCoinCountSetting(database.settings.initialCoinCount));

    database.decks.forEach((deck) => {
      errors.push(...validateDeck(deck));
    });
  } catch (error) {
    return [
      createValidationError('DATABASE_STRUCTURE_INVALID'),
    ];
  }

  const result = errors.filter((error) => {
    return error !== null;
  });

  return result;
};

export const validateDeck = (deck: IDatabaseStoreDeck) => {
  const errors: (ValidationError | null)[] = [];

  try {
    errors.push(validateDeckId(deck.id));
    errors.push(validateDeckTitle(deck.title));
    errors.push(validateDeckDescription(deck.description));

    errors.push(validateDeckHeroSetNumber(deck.hero.setNumber));
    errors.push(validateDeckHeroCardNumber(deck.hero.cardNumber));

    deck.deck.forEach((card) => {
      errors.push(validateDeckDeckSetNumber(card.setNumber));
      errors.push(validateDeckDeckCardNumber(card.cardNumber));
    });

    deck.sideboard.forEach((card) => {
      errors.push(validateDeckSideboardSetNumber(card.setNumber));
      errors.push(validateDeckkSideboardCardNumber(card.cardNumber));
    });
  } catch (error) {
    return [
      createValidationError('DATABASE_STRUCTURE_INVALID'),
    ];
  }

  const result = errors.filter((error) => {
    return error !== null;
  });

  return result;
};

export const validateDatabaseName: IValidation = (value: string) => {
  const regExp = new RegExp(`^[а-яА-Яa-zA-Z0-9_ ]{${DATABASE_NAME_LENGTH_MIN},${DATABASE_NAME_LENGTH_MAX}}$`, 'gmi');

  if (!regExp.test(value)) {
    return createValidationError('DATABASE_NAME_INVALID');
  }

  return null;
};

export const validateLastSelectedDeckIdTopSetting = (value: string) => {
  const regExp = new RegExp(`^[A-Za-z0-9_-]{21}$`, 'gmi');

  if (!regExp.test(value)) {
    return createValidationError('LAST_SELECTED_ID_TOP_INVALID');
  }

  return null;
};

export const validateLastSelectedDeckIdBottomSetting = (value: string) => {
  const regExp = new RegExp(`^[A-Za-z0-9_-]{21}$`, 'gmi');

  if (!regExp.test(value)) {
    return createValidationError('LAST_SELECTED_ID_BOTTOM_INVALID');
  }

  return null;
};

export const validateAutoDealCardCountSetting: IValidation = (value: number) => {
  const regExp = new RegExp('^[0-4]{1}$');

  if (!regExp.test(value.toString())) {
    return createValidationError('SETTING_AUTO_DEAL_CARDS_COUNT_INVALID');
  }

  return null;
};

export const validateInitialCoinCountSetting: IValidation = (value: number) => {
  const regExp = new RegExp('^[0-9]{1,2}$');

  if (
    !regExp.test(value.toString()) ||
    value < SETTING_INITIAL_COINT_COUNT_MIN ||
    value > SETTING_INITIAL_COINT_COUNT_MAX
  ) {
    return createValidationError('SETTING_INITIAL_COIN_COUNT_INVALID');
  }

  return null;
};

export const validateDeckId = (value: string) => {
  const regExp = new RegExp(`^[A-Za-z0-9_-]{21}$`, 'gmi');

  if (!regExp.test(value)) {
    return createValidationError('DECK_ID_INVALID');
  }

  return null;
};

export const validateDeckTitle: IValidation = (value: string) => {
  const regExp = new RegExp(`^[а-яА-Яa-zA-Z0-9_ ]{${DECK_TITLE_LENGTH_MIN},${DECK_TITLE_LENGTH_MAX}}$`, 'gmi');

  if (!regExp.test(value)) {
    return createValidationError('DECK_TITLE_INVALID');
  }

  return null;
};

export const validateDeckDescription: IValidation = (value: string) => {
  const regExp = new RegExp(`^[а-яА-Яa-zA-Z0-9_ ]{${DECK_DESCRIPTION_LENGTH_MIN},${DECK_DESCRIPTION_LENGTH_MAX}}$`, 'gmi');

  if (!regExp.test(value)) {
    return createValidationError('DECK_DESCRIPTION_INVALID');
  }

  return null;
};

export const validateDeckHeroSetNumber: IValidation = (value: number) => {
  const regExp = new RegExp(`^[0-9]{1,3}$`);

  if (!regExp.test(value.toString())) {
    return createValidationError('DECK_HERO_SET_NUMBER_INVALID');
  }

  return null;
};

export const validateDeckHeroCardNumber: IValidation = (value: number) => {
  const regExp = new RegExp(`^[0-9]{1,3}$`);

  if (!regExp.test(value.toString())) {
    return createValidationError('DECK_HERO_CARD_NUMBER_INVALID');
  }

  return null;
};

export const validateDeckDeckSetNumber: IValidation = (value: number) => {
  const regExp = new RegExp(`^[0-9]{1,3}$`);

  if (!regExp.test(value.toString())) {
    return createValidationError('DECK_DECK_SET_NUMBER_INVALID');
  }

  return null;
};

export const validateDeckDeckCardNumber: IValidation = (value: number) => {
  const regExp = new RegExp(`^[0-9]{1,3}$`);

  if (!regExp.test(value.toString())) {
    return createValidationError('DECK_DECK_CARD_NUMBER_INVALID');
  }

  return null;
};

export const validateDeckSideboardSetNumber: IValidation = (value: number) => {
  const regExp = new RegExp(`^[0-9]{1,3}$`);

  if (!regExp.test(value.toString())) {
    return createValidationError('DECK_SIDEBOARD_SET_NUMBER_INVALID');
  }

  return null;
};

export const validateDeckkSideboardCardNumber: IValidation = (value: number) => {
  const regExp = new RegExp(`^[0-9]{1,3}$`);

  if (!regExp.test(value.toString())) {
    return createValidationError('DECK_SIDEBOARD_CARD_NUMBER_INVALID');
  }

  return null;
};
