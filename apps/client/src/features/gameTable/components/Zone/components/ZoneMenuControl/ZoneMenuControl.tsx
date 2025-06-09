import { useStore } from '@nanostores/preact';
import { memo } from 'preact/compat';
import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';

import type { ZoneType } from '../../../../store';
import { $gameTableStore } from '../../../../store';
import { setActiveZoneMenu } from '../../../../actions';

import './styles.css';

type Props = {
  zoneType: ZoneType;
}

export const ZoneMenuControl = memo(({ zoneType }: Props) => {
  const { activeZoneMenu } = useStore($gameTableStore);
  const isMenuOpen = activeZoneMenu === zoneType;

  const onOpenMenu = useCallback(() => {
    setActiveZoneMenu(zoneType);
  }, []);

  const onCloseMenu = useCallback(() => {
    setActiveZoneMenu(null);
  }, []);

  return (
    <div
      className="game-table-zone-menu-control"
    >
      {
        isMenuOpen
          ? (
            <Button
              color="white"
              padding="sm2"
              border="none"
              onClick={onCloseMenu}
            >
              <Icon
                image="close"
                size="sm"
              />
            </Button>
          )
          : (
            <Button
              color="white"
              padding="sm2"
              border="none"
              onClick={onOpenMenu}
            >
              <Icon
                image="dots-vertical"
                size="sm"
              />
            </Button>
          )
      }
    </div>
  );
});
