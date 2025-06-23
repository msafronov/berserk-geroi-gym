import { nanoid } from "nanoid";

import {
  getLastSelectedDeckTop,
  getLastSelectedDeckBottom,
  getSettings,
} from "@/features/database/actions";

import type { IDatabaseStoreCard, IDatabaseStoreSettings } from "@/features/database/store";

import type { IGameTableCard, OwnerType, ZoneType } from "../store";
import { $gameTableStore, initialState } from "../store";
import { addCardsToZone, shuffle } from "./zoneActions";
import { getGameZoneCoordinates } from "./geometryActions";
import { defaultCardState } from "./const";
import { CARD_WIDTH, CARD_HEIGHT } from "../const";

export const databaseStoreToGameTableCardsMapper = (databaseStoreCards: Partial<IDatabaseStoreCard>[], zone: ZoneType, owner: OwnerType): IGameTableCard[] => {
  return databaseStoreCards.map((databaseStoreCard) => {
    return {
      ...defaultCardState,
      ...databaseStoreCard,
      id: nanoid(),
      owner,
      zone,
    };
  });
};

const createHandTop = (deckCards: IDatabaseStoreCard[], settings: IDatabaseStoreSettings) => {
  const deckCardsMapped = databaseStoreToGameTableCardsMapper(deckCards, 'handTop', 'top');

  const deckCardsDealed = settings.autoDealCardsCount > 0
    ? deckCardsMapped.slice(0, settings.autoDealCardsCount)
    : deckCardsMapped;

  addCardsToZone(deckCardsDealed, '_system', 'handTop');
};

const createHandBottom = (deckCards: IDatabaseStoreCard[], settings: IDatabaseStoreSettings) => {
  const deckCardsMapped = databaseStoreToGameTableCardsMapper(deckCards, 'handBottom', 'bottom');

  const deckCardsDealed = settings.autoDealCardsCount > 0
    ? deckCardsMapped.slice(0, settings.autoDealCardsCount)
    : deckCardsMapped;

  addCardsToZone(deckCardsDealed, '_system', 'handBottom');
};

const createDeckTop = (deckCards: IDatabaseStoreCard[], settings: IDatabaseStoreSettings) => {
  const deckCardsMapped = databaseStoreToGameTableCardsMapper(deckCards, 'deckTop', 'top');

  const deckCardsDealed = settings.autoDealCardsCount > 0
    ? deckCardsMapped.slice(settings.autoDealCardsCount)
    : deckCardsMapped;

  addCardsToZone(deckCardsDealed, '_system', 'deckTop');
};

const createDeckBottom = (deckCards: IDatabaseStoreCard[], settings: IDatabaseStoreSettings) => {
  const deckCardsMapped = databaseStoreToGameTableCardsMapper(deckCards, 'deckBottom', 'bottom');

  const deckCardsDealed = settings.autoDealCardsCount > 0
    ? deckCardsMapped.slice(settings.autoDealCardsCount)
    : deckCardsMapped;

  addCardsToZone(deckCardsDealed, '_system', 'deckBottom');
};

const createSideboardTop = (sideboardCards: IDatabaseStoreCard[], settings: IDatabaseStoreSettings) => {
  const sideboardCardsMapped = databaseStoreToGameTableCardsMapper(sideboardCards, 'sideboardTop', 'top');

  addCardsToZone(sideboardCardsMapped, '_system', 'sideboardTop');
};

const createSideboardBottom = (sideboardCards: IDatabaseStoreCard[], settings: IDatabaseStoreSettings) => {
  const sideboardCardsMapped = databaseStoreToGameTableCardsMapper(sideboardCards, 'sideboardBottom', 'bottom');

  addCardsToZone(sideboardCardsMapped, '_system', 'sideboardBottom');
};

const createGameZoneTop = (heroCard: IDatabaseStoreCard | undefined, settings: IDatabaseStoreSettings) => {
  const y = 20;

  if (heroCard) {
    const heroCardMapped = databaseStoreToGameTableCardsMapper([heroCard], 'gameZone', 'top')[0];
  
    addCardsToZone([{ ...heroCardMapped, x: CARD_WIDTH, y }], '_system', 'gameZone');
  }

  if (settings.initialCoinCount > 0) {
    const coins = databaseStoreToGameTableCardsMapper(
      new Array(settings.initialCoinCount).fill(null).map((_, index) => {
        return {
          ...defaultCardState,
          type: 'coin',
          x: (CARD_WIDTH * 2) + 32 + (index * 2),
          y,
        };
      }),
      'gameZone',
      'top',
    );

    addCardsToZone(coins, '_system', 'gameZone');
  }
};

const createGameZoneBottom = (heroCard: IDatabaseStoreCard | undefined, settings: IDatabaseStoreSettings) => {
  const gameZoneCoordinates = getGameZoneCoordinates();
  const y = gameZoneCoordinates.height - CARD_HEIGHT - 40;

  if (heroCard) {
    const heroCardMapped = databaseStoreToGameTableCardsMapper([heroCard], 'gameZone', 'bottom')[0];

    addCardsToZone([{ ...heroCardMapped, x: CARD_WIDTH, y }], '_system', 'gameZone');
  }

  if (settings.initialCoinCount > 0) {
    const coins = databaseStoreToGameTableCardsMapper(
      new Array(settings.initialCoinCount).fill(null).map((_, index) => {
        return {
          ...defaultCardState,
          type: 'coin',
          x: (CARD_WIDTH * 2) + 32 + (index * 2),
          y,
        };
      }),
      'gameZone',
      'bottom',
    );
  
    addCardsToZone(coins, '_system', 'gameZone');
  }
};

export const startGame = () => {
  const lastSelectedDeckTop = getLastSelectedDeckTop();
  const lastSelectedDeckBottom = getLastSelectedDeckBottom();

  const settings = getSettings();

  if (lastSelectedDeckTop) {
    const { hero, deck, sideboard } = lastSelectedDeckTop;
    const deckShuffled = shuffle(deck);

    createGameZoneTop(hero, settings);
    createHandTop(deckShuffled, settings);
    createDeckTop(deckShuffled, settings);
    createSideboardTop(sideboard, settings);
  }

  if (lastSelectedDeckBottom) {
    const { hero, deck, sideboard } = lastSelectedDeckBottom;
    const deckShuffled = shuffle(deck);

    createGameZoneBottom(hero, settings);
    createHandBottom(deckShuffled, settings);
    createDeckBottom(deckShuffled, settings);
    createSideboardBottom(sideboard, settings);
  }
};

export const endGame = () => {
  $gameTableStore.set({
    ...initialState,
    gameZoneRef: $gameTableStore.get().gameZoneRef,
  });
};
