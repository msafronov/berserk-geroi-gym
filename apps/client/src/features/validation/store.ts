import { atom } from 'nanostores';

export type IValidationErrorCode =
  | 'DECK_TITLE_IS_EMPTY_ERROR'
  | 'DECK_TITLE_IS_INVALID_ERROR'
  | 'DECK_DESCRIPTION_IS_INVALID_ERROR';

export interface IValidationStore {
  errors: IValidationErrorCode[];
}

export const $validationStore = atom<IValidationStore>({
  errors: [],
});
