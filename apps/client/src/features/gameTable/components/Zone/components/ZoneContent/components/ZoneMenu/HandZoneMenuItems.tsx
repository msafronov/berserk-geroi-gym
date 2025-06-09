import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { setActiveZoneMenu, changeCardsBetweenZones } from '../../../../../../actions';

import type { ZoneMenuItems } from './ZoneMenuItems';

export const HandZoneMenuItems = ({ zoneType }: ZoneMenuItems) => {
  const onChangeCards = useCallback(() => {
    const zoneFrom = zoneType;
    const zoneTo = zoneType === 'handTop'
      ? 'sideboardTop'
      : 'sideboardBottom';

    setActiveZoneMenu(null);
    changeCardsBetweenZones(zoneFrom, zoneTo);
  }, [zoneType]);

  return (
    <>
      <Button size="lg" color="violett" onClick={onChangeCards}>
        <Text color="white" size="sm" weight="bold">Поменять с сайдбордом</Text>
      </Button>
    </>
  );
};
