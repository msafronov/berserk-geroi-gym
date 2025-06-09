import type { ZoneType } from '../../../../../../store';

import { Wrapper } from './components/Wrapper/Wrapper';

import { DeckZoneMenuItems } from './DeckZoneMenuItems';
import { GraveyardZoneMenuItems } from './GraveyardZoneMenuItems';
import { HandZoneMenuItems } from './HandZoneMenuItems';
import { SideboardZoneMenuItems } from './SideboardZoneMenuItems';

type Props = {
  zoneType: ZoneType;
};

export const ZoneMenu = ({ zoneType }: Props) => {
  const isDeck = zoneType === 'deckTop' || zoneType === 'deckBottom';
  const isHand = zoneType === 'handTop' || zoneType === 'handBottom';
  const isGraveyard = zoneType === 'graveyardTop' || zoneType === 'graveyardBottom';
  const isSideboard = zoneType === 'sideboardTop' || zoneType === 'sideboardBottom';

  if (isDeck) {
    return (
      <Wrapper>
        <DeckZoneMenuItems zoneType={zoneType} />
      </Wrapper>
    );
  }

  if (isHand) {
    return (
      <Wrapper>
        <HandZoneMenuItems zoneType={zoneType} />
      </Wrapper>
    );
  }

  if (isGraveyard) {
    return (
      <Wrapper>
        <GraveyardZoneMenuItems zoneType={zoneType} />
      </Wrapper>
    );
  }

  if (isSideboard) {
    return (
      <Wrapper>
        <SideboardZoneMenuItems zoneType={zoneType} />
      </Wrapper>
    );
  }

  return null;
};
