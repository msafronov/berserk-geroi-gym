import type { JSX } from 'preact/jsx-runtime';
import { useStore } from '@nanostores/preact';

import type { ZoneType } from '../../../../store';
import { $gameTableStore } from '../../../../store';

import { Wrapper } from './components/Wrapper/Wrapper';
import { ZoneMenu } from './components/ZoneMenu/ZoneMenu';

type Props = {
  zoneType: ZoneType | null,
  orientation?: 'horizontal',
  isActive?: boolean;
  children?: JSX.Element | JSX.Element[] | null;
}

export const ZoneContent = ({
  zoneType,
  orientation,
  isActive = false,
  children,
}: Props) => {
  const { activeZoneMenu } = useStore($gameTableStore);
  const isMenuOpen = zoneType && activeZoneMenu === zoneType;

  if (isMenuOpen) {
    return (
      <Wrapper
        orientation={orientation}
        isActive={isActive}
      >
        <ZoneMenu
          zoneType={activeZoneMenu}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      orientation={orientation}
      isActive={isActive}
    >
      {children}
    </Wrapper>
  );
};
