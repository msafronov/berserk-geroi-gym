import { useCallback } from "preact/hooks";

import type { ZoneType } from "../store";
import {
  transformWindowToGameZoneCoordinates,
  moveCardBetweenZone,
  updateGameTableCardById,
  setIsDragging,
  changeCardOrderById,
} from "../actions";

type Props = {
  zoneType: ZoneType;
};

type DragData = {
  cardId: string;
  zoneFrom: ZoneType;
};

let mouseOffsetInsideDraggableCardX = 0;
let mouseOffsetInsideDraggableCardY = 0;

const getCardData = (event: DragEvent): { cardId: string, order: number } | null => {
  // @ts-ignore
  // event.target.dataset существует в объекте DragEvent
  const { objectId, objectValue: cardId, objectOrder: order } = event.target?.dataset || {};

  if (objectId !== 'card') {
    // TODO: системная ошибка
    return null;
  }

  return {
    cardId,
    order: Number(order),
  };
};

export const useDrag = ({ zoneType }: Props) => {
  const onDragStart = useCallback((event: DragEvent) => {
    const cardData = getCardData(event);

    if (!cardData) {
      return;
    }

    setIsDragging(true);

    mouseOffsetInsideDraggableCardX = event.offsetX;
    mouseOffsetInsideDraggableCardY = event.offsetY;

    // @ts-ignore
    // event.dataTransfer существует в объекте DragEvent
    event.dataTransfer.setData("text/plain", JSON.stringify({
      cardId: cardData.cardId,
      zoneFrom: zoneType,
    }));
  }, [zoneType]);

  const onDrop = useCallback((event: DragEvent) => {
    event.preventDefault();

    // @ts-ignore
    // event.dataTransfer существует в объекте DragEvent
    const { cardId, zoneFrom } = JSON.parse(event.dataTransfer.getData("text/plain")) as DragData;
    const zoneTo = zoneType;

    moveCardBetweenZone(cardId, zoneFrom, zoneTo);

    if (zoneTo === 'gameZone') {
      const { gameZoneCoordinateX, gameZoneCoordinateY } = transformWindowToGameZoneCoordinates({
        windowCoordinateX: event.pageX - mouseOffsetInsideDraggableCardX,
        windowCoordinateY: event.pageY - mouseOffsetInsideDraggableCardY,
      });

      updateGameTableCardById(cardId, {
        x: gameZoneCoordinateX,
        y: gameZoneCoordinateY,
      });
    }

    if (zoneTo !== 'gameZone') {
      const targetCardData = getCardData(event);

      if (targetCardData?.order) {
        changeCardOrderById(cardId, targetCardData.order);
      }
    }

    setIsDragging(false);
  }, [zoneType]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
  }, [zoneType]);

  return {
    onDragStart,
    onDrop,
    onDragOver,
  };
};
