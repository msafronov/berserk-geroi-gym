import type { IDatabaseStore } from "@/features/database/store";
import type { IValidationErrorCode } from "./store";

import { $validationStore } from "./store";

import {
  DECK_TITLE_LENGTH_MIN,
  DECK_TITLE_LENGTH_MAX,
  DECK_DESCRIPTION_LENGTH_MAX,
} from "./const";

type IValidation = (value: any) => IValidationErrorCode[];

export const validateDeckTitle: IValidation = (deckTitle: string) => {
  const errors: IValidationErrorCode[] = [];
  const deckTitleLength = deckTitle?.length || 0;

  if (deckTitleLength < DECK_TITLE_LENGTH_MIN) {
    errors.push('DECK_TITLE_IS_EMPTY_ERROR');
  }

  // TODO: prevent XSS
  if (deckTitleLength > DECK_TITLE_LENGTH_MAX) {
    errors.push('DECK_TITLE_IS_INVALID_ERROR');
  }

  return errors;
};

export const validateDeckDescription = (deckDesciption: string) => {
  const errors: IValidationErrorCode[] = [];
  const deckDescriptionLength = deckDesciption?.length || 0;

  // TODO: prevent XSS
  if (deckDescriptionLength > DECK_DESCRIPTION_LENGTH_MAX) {
    errors.push('DECK_DESCRIPTION_IS_INVALID_ERROR');
  }

  return errors;
};

export const validateDatabase = (database: IDatabaseStore) => {
  const errors: IValidationErrorCode[] = [];

  database.decks.forEach((deck) => {
    errors.push(
      ...validateDeckTitle(deck.title),
      ...validateDeckDescription(deck.description),
    );
  });

  $validationStore.set({ errors });
};
