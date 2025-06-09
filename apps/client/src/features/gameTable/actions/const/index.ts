import type { CardType } from "../../store";

import { CARD_WIDTH, CARD_HEIGHT } from "../../const";

export const defaultCardState = {
  type: 'card' as CardType,
  x: 0,
  y: 0,
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  setNumber: 0,
  cardNumber: 0,
  isActive: false,
  isClosed: false,
  isFaceDown: false,
  counterWhite: 0,
  counterBlack: 0,
  counterRed: 0,
  counterGreen: 0,
};
