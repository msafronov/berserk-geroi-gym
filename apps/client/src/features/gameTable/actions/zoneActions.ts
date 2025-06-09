import { $gameTableStore } from "../store";
import type { IGameTableCard, ZoneType } from "../store";
import {
  ACTIVE_CARD_COUNTER_VALUE_MAX,
  ACTIVE_CARD_COUNTER_VALUE_MIN,
} from "../const";

export const shuffle = <T>(deck: T[]): T[] => {
  const result = [...deck];

  let currentIndex = result.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }

  return result;
};

export const processZoneCardByRules = (card: IGameTableCard, zoneFrom: ZoneType, zoneTo: ZoneType): IGameTableCard => {
  let cardByRules = {
    ...card,
    isFaceDown: false,
  };

  // все жетоны и маркеры уничтожаются при входе в НЕ игровую зону
  if (zoneTo !== 'gameZone') {
    cardByRules = {
      ...cardByRules,
      isActive: false,
      isClosed: false,
      counterRed: 0,
      counterGreen: 0,
      counterWhite: 0,
      counterBlack: 0,
    };
  }

  // при входе в зону колоды из игровой зоны или системной зоны
  // карты переворачиваются по-умолчанию рубашкой вниз
  if (
    (zoneFrom === 'gameZone' || zoneFrom === '_system') &&
    (zoneTo === 'deckTop' || zoneTo === 'deckBottom')
  ) {
    cardByRules.isFaceDown = true;
  }

  // при перемещении карт внутри колоды она сохраняет состояние закрытости
  if (
    (zoneFrom === 'deckTop' && zoneTo === 'deckTop') ||
    (zoneFrom === 'deckBottom' && zoneTo === 'deckBottom')
  ) {
    cardByRules.isFaceDown = card.isFaceDown;
  }

  return {
    ...card,
    ...cardByRules,
  };
};

export const setActiveZoneMenu = (activeZoneMenu: ZoneType | null) => {
  $gameTableStore.set({
    ...$gameTableStore.get(),
    activeZoneMenu,
  });
};

export const setActiveZoneTop = (activeZoneTop: ZoneType) => {
  $gameTableStore.set({
    ...$gameTableStore.get(),
    activeZoneTop,
  });
};

export const setActiveZoneBottom = (activeZoneBottom: ZoneType) => {
  $gameTableStore.set({
    ...$gameTableStore.get(),
    activeZoneBottom,
  });
};

export const removeCardFromZoneById = (cardIdForRemove: string, zone: ZoneType): IGameTableCard | null => {
  const gameTableStore = $gameTableStore.get();

  const cardForRemove = gameTableStore[zone].find((card) => {
    return card.id === cardIdForRemove;
  });

  if (!cardForRemove) {
    // TODO: системная ошибка
    return null;
  }

  $gameTableStore.set({
    ...gameTableStore,
    [zone]: gameTableStore[zone].filter((card) => {
      return card.id !== cardIdForRemove;
    }),
  });

  return cardForRemove;
};

export const addCardsToZone = (cards: IGameTableCard[], zoneFrom: ZoneType, zoneTo: ZoneType) => {
  const gameTableStore = $gameTableStore.get();

  const processedCards = cards.map((card) => {
    return {
      ...processZoneCardByRules(card, zoneFrom, zoneTo),
      zone: zoneTo,
    };
  });

  $gameTableStore.set({
    ...gameTableStore,
    [zoneTo]: [
      ...processedCards,
      ...gameTableStore[zoneTo],
    ],
  });
};

export const moveCardBetweenZone = (cardId: string, zoneFrom: ZoneType, zoneTo: ZoneType) => {
  const removedCard = removeCardFromZoneById(cardId, zoneFrom);

  if (removedCard) {
    addCardsToZone([removedCard], zoneFrom, zoneTo);
  }

  if (zoneTo !== 'gameZone') {
    setActiveGameTableCardId(null);
  }
};

export const setActiveGameTableCardId = (activeGameTableCardId: string | null) => {
  const prevActiveGameTableCard = $gameTableStore.get().activeGameTableCard;
  const activeGameTableCard = activeGameTableCardId
    ? findGameTableCardById(activeGameTableCardId)
    : null;

  $gameTableStore.set({
    ...$gameTableStore.get(),
    activeGameTableCard,
  });

  if (prevActiveGameTableCard) {
    updateGameTableCardById(prevActiveGameTableCard.id, { isActive: false });
  }

  if (activeGameTableCardId) {
    updateGameTableCardById(activeGameTableCardId, { isActive: true });
    return;
  }
};

export const updateGameTableCardById = (cardId: string, data: Partial<IGameTableCard>) => {
  const gameTableStore = $gameTableStore.get();
  const cardForUpdate = findGameTableCardById(cardId);

  if (!cardForUpdate) {
    // TODO: системная ошибка
    return;
  }

  const isActiveCard = gameTableStore?.activeGameTableCard?.id === cardForUpdate.id;
  const updatedCard = {...cardForUpdate, ...data};

  $gameTableStore.set({
    ...gameTableStore,

    ...isActiveCard && {
      activeGameTableCard: updatedCard,
    },

    [updatedCard.zone]: gameTableStore[updatedCard.zone].map((card) => {
      if (card.id === cardId) {
        return updatedCard;
      }

      return card;
    }),
  });
};

export const findGameTableCardById = (cardId: string): IGameTableCard | null => {
  const zones: Required<ZoneType>[] = [
    '_system',
    'handTop',
    'deckTop',
    'graveyardTop',
    'questsTop',
    'sideboardTop',
    'handBottom',
    'deckBottom',
    'graveyardBottom',
    'questsBottom',
    'sideboardBottom',
    'gameZone',
  ];

  for (let zone of zones) {
    const foundedCard = $gameTableStore.get()[zone].find((card) => {
      return card.id === cardId;
    });
  
    if (foundedCard) {
      return foundedCard;
    }
  }

  return null;
};

export const setIsDragging = (isDragging: boolean) => {
  $gameTableStore.set({
    ...$gameTableStore.get(),
    isDragging,
  });
};

export const changeActiveCardCounter = (
  counterColor: 'counterRed' | 'counterGreen' | 'counterWhite' | 'counterBlack',
  direction: 'increase' | 'decrease',
) => {
  const activeCard = $gameTableStore.get().activeGameTableCard;

  if (!activeCard) {
    return;
  }

  const newCounterValue = direction === 'increase'
    ? activeCard[counterColor] + 1
    : activeCard[counterColor] - 1;

  if (newCounterValue < ACTIVE_CARD_COUNTER_VALUE_MIN || newCounterValue > ACTIVE_CARD_COUNTER_VALUE_MAX) {
    return;
  }

  updateGameTableCardById(activeCard.id, { [counterColor]: newCounterValue });
};

export const toggleOpenCloseActiveCard = () => {
  const activeCard = $gameTableStore.get().activeGameTableCard;

  if (!activeCard) {
    return;
  }

  updateGameTableCardById(activeCard.id, { isClosed: !activeCard.isClosed });
};

export const toggleIsFaceDownActiveCard = () => {
  const activeCard = $gameTableStore.get().activeGameTableCard;

  if (!activeCard) {
    return;
  }

  updateGameTableCardById(activeCard.id, { isFaceDown: !activeCard.isFaceDown });
};

export const setIsFaceDownZoneCards = (zone: ZoneType, isFaceDown: boolean) => {
  $gameTableStore.set({
    ...$gameTableStore.get(),
    [zone]: $gameTableStore.get()[zone].map((card) => {
      return {
        ...card,
        isFaceDown,
      };
    }),
  });
};

export const shuffleZoneCards = (zone: ZoneType) => {
  $gameTableStore.set({
    ...$gameTableStore.get(),
    [zone]: shuffle($gameTableStore.get()[zone]),
  });
};

export const mixActiveCardToDeck = () => {
  const activeCard = $gameTableStore.get().activeGameTableCard;

  if (!activeCard) {
    return;
  }

  const zoneFrom = activeCard.zone;
  const zoneTo = activeCard.owner === 'top'
    ? 'deckTop'
    : 'deckBottom';

  moveCardBetweenZone(activeCard.id, zoneFrom, zoneTo);
  shuffleZoneCards(zoneTo);
  setIsFaceDownZoneCards(zoneTo, true);
};

export const mixCardsFromZoneToZone = (zoneFrom: ZoneType, zoneTo: ZoneType) => {
  const cardsForMix = [
    ...$gameTableStore.get()[zoneFrom],
    ...$gameTableStore.get()[zoneTo],
  ];

  $gameTableStore.set({
    ...$gameTableStore.get(),
    [zoneFrom]: [],
    [zoneTo]: []
  });

  addCardsToZone(cardsForMix, zoneFrom, zoneTo);
  shuffleZoneCards(zoneTo);
  setIsFaceDownZoneCards(zoneTo, true);
};

export const changeCardsBetweenZones = (zoneFrom: ZoneType, zoneTo: ZoneType) => {
  const zoneFromCards = [...$gameTableStore.get()[zoneFrom]];
  const zoneToCards = [...$gameTableStore.get()[zoneTo]];

  $gameTableStore.set({
    ...$gameTableStore.get(),
    [zoneFrom]: [],
    [zoneTo]: [],
  });

  addCardsToZone(zoneFromCards, zoneFrom, zoneTo);
  addCardsToZone(zoneToCards, zoneTo, zoneFrom);
};

export const changeCardOrder = (card: IGameTableCard, order: number): void => {
  const cardsFiltered = $gameTableStore.get()[card.zone].filter((zoneCard) => {
    return zoneCard.id !== card.id;
  });

  $gameTableStore.set({
    ...$gameTableStore.get(),
    [card.zone]: [
      ...cardsFiltered.slice(0, order),
      card,
      ...cardsFiltered.slice(order),
    ],
  })
};

export const changeCardOrderById = (cardId: string, order: number): void => {
  const card = findGameTableCardById(cardId);

  if (!card) {
    return;
  }

  changeCardOrder(card, order);
};

export const moveActiveCardToDeck = (direction: 'first' | 'last') => {
  const activeCard = $gameTableStore.get().activeGameTableCard;

  if (!activeCard) {
    return;
  }

  const { id: activeCardId, zone: zoneFrom, owner } = activeCard;

  const zoneTo = owner === 'top'
    ? 'deckTop'
    : 'deckBottom';

  moveCardBetweenZone(activeCardId, zoneFrom, zoneTo);

  if (direction === 'first') {
    // по-умолчанию добавление карты произойдет наверх колоды
    return;
  }

  if (direction === 'last') {
    const lastCardOrder = $gameTableStore.get()[zoneTo].length;

    changeCardOrderById(activeCardId, lastCardOrder);
  }
};
