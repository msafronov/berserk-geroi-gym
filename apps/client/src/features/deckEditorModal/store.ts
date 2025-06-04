import { atom } from 'nanostores';

import type { IDatabaseStoreDeck } from '@/features/database/store';
import { CARD_EMPTY_CARD_NUMBER, CARD_EMPTY_SET_NUMBER } from '@/features/validation/const';

export type IDeckEditorModalSwitchItem =
  | 'SWITCH_ITEM_DECK'
  | 'SWITCH_ITEM_SIDEBOARD';

export interface IDeckEditorModalStore {
  isOpened: boolean;
  isCreation: boolean;
  activeSwitchItem: IDeckEditorModalSwitchItem;
  deck: IDatabaseStoreDeck,
}

export const $deckEditorModalStore = atom<IDeckEditorModalStore>({
  isOpened: false,
  isCreation: false,
  activeSwitchItem: 'SWITCH_ITEM_DECK',
  deck: {
    id: '',
    title: 'Без названия',
    description: '',
    hero: { setNumber: CARD_EMPTY_SET_NUMBER, cardNumber: CARD_EMPTY_CARD_NUMBER },
    deck: [],
    sideboard: [],
  },
});
