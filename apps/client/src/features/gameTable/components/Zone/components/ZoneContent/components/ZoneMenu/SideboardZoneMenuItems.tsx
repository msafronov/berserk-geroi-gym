import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Text } from '@/ui/Text/Text';

import { setActiveZoneMenu, changeCardsBetweenZones } from '../../../../../../actions';

import type { ZoneMenuItems } from './ZoneMenuItems';

export const SideboardZoneMenuItems = ({ zoneType }: ZoneMenuItems) => {
  const onClick = useCallback(() => {
      const zoneFrom = zoneType;
      const zoneTo = zoneType === 'sideboardTop'
        ? 'handTop'
        : 'handBottom';
  
      setActiveZoneMenu(null);
      changeCardsBetweenZones(zoneFrom, zoneTo);
  }, [zoneType]);

  return (
    <>
      <Button size="lg" color="violett" onClick={onClick}>
        <Text color="white" size="sm" weight="bold">Поменять с рукой</Text>
      </Button>
    </>
  );
};
