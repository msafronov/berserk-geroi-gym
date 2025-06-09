import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { setActiveZoneMenu, mixCardsFromZoneToZone } from '../../../../../../actions';

import type { ZoneMenuItems } from './ZoneMenuItems';

export const GraveyardZoneMenuItems = ({ zoneType }: ZoneMenuItems) => {
  const onMixCardsToDeck = useCallback(() => {
    const zoneFrom = zoneType;
    const zoneTo = zoneType === 'graveyardTop'
      ? 'deckTop'
      : 'deckBottom';

    setActiveZoneMenu(null);
    mixCardsFromZoneToZone(zoneFrom, zoneTo);
  }, [zoneType]);

  return (
    <>
      <Button size="lg" color="violett" onClick={onMixCardsToDeck}>
        <Text color="white" size="sm" weight="bold">Замешать карты в колоду</Text>
      </Button>
    </>
  );
};
