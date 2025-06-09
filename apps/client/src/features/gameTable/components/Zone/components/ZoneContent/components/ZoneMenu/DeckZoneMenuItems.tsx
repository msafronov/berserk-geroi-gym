import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { setActiveZoneMenu, setIsFaceDownZoneCards, shuffleZoneCards } from '../../../../../../actions';

import type { ZoneMenuItems } from './ZoneMenuItems';

export const DeckZoneMenuItems = ({ zoneType }: ZoneMenuItems) => {
  const onShowCards = useCallback(() => {
    setActiveZoneMenu(null);
    setIsFaceDownZoneCards(zoneType, false);
  }, [zoneType]);

  const onShuffle = useCallback(() => {
    setActiveZoneMenu(null);
      shuffleZoneCards(zoneType);
      setIsFaceDownZoneCards(zoneType, true);
  }, [zoneType]);

  return (
    <>
      <Button size="lg" color="violett" onClick={onShowCards}>
        <Text color="white" size="sm" weight="bold">Показать карты</Text>
      </Button>

      <Button size="lg" color="violett" onClick={onShuffle}>
        <Text color="white" size="sm" weight="bold">Перемешать</Text>
      </Button>
    </>
  );
};
