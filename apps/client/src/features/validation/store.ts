import { atom } from 'nanostores';

export type ValidationErrorCode =
  | 'DATABASE_STRUCTURE_INVALID'
  | 'DATABASE_NAME_INVALID'
  | 'LAST_SELECTED_ID_TOP_INVALID'
  | 'LAST_SELECTED_ID_BOTTOM_INVALID'
  | 'SETTING_AUTO_DEAL_CARDS_COUNT_INVALID'
  | 'SETTING_INITIAL_COIN_COUNT_INVALID'
  | 'DECK_ID_INVALID'
  | 'DECK_TITLE_INVALID'
  | 'DECK_DESCRIPTION_INVALID'
  | 'DECK_HERO_SET_NUMBER_INVALID'
  | 'DECK_HERO_CARD_NUMBER_INVALID'
  | 'DECK_DECK_SET_NUMBER_INVALID'
  | 'DECK_DECK_CARD_NUMBER_INVALID'
  | 'DECK_SIDEBOARD_SET_NUMBER_INVALID'
  | 'DECK_SIDEBOARD_CARD_NUMBER_INVALID';

export type ValidationError = {
  code: ValidationErrorCode;
  message: string;
};

export interface IValidationStore {}

export const $validationStore = atom<IValidationStore>({});
