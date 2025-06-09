import { $gameTableStore } from "../store";

export const saveGameZoneRef = (gameZoneRef: HTMLDivElement) => {
  $gameTableStore.set({
    ...$gameTableStore.get(),
    gameZoneRef,
  });
};

export const getGameZoneCoordinates = () => {
  const gameZoneRef = $gameTableStore.get().gameZoneRef;

  if (!gameZoneRef) {
    // TODO: системная ошибка
    return { x: 0, y: 0, width: 0, height: 0, scrollLeft: 0, scrollTop: 0 };
  }

  const { scrollLeft, scrollTop } = gameZoneRef;
  const { left: x, top: y, width, height } = gameZoneRef.getBoundingClientRect();

  return { x, y, width, height, scrollLeft, scrollTop };
};

export const transformWindowToGameZoneCoordinates = ({
  windowCoordinateX,
  windowCoordinateY
}: {
  windowCoordinateX: number;
  windowCoordinateY: number;
}): {
  gameZoneCoordinateX: number;
  gameZoneCoordinateY: number;
} => {
  const gameZoneCoordinates = getGameZoneCoordinates();

  return {
    gameZoneCoordinateX: windowCoordinateX + gameZoneCoordinates.scrollLeft,
    gameZoneCoordinateY: (windowCoordinateY - gameZoneCoordinates.y) + gameZoneCoordinates.scrollTop,
  };
};
