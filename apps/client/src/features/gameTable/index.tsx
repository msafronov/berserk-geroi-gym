import { memo } from 'preact/compat';

import { Wrapper } from './components/Wrapper/Wrapper';
import { WrapperPanel } from './components/WrapperPanel/WrapperPanel';

import { SideboardTopZone } from './components/Zone/SideboardTopZone';
import { QuestsTopZone } from './components/Zone/QuestsTopZone';
import { GraveyardTopZone } from './components/Zone/GraveyardTopZone';
import { DeckTopZone } from './components/Zone/DeckTopZone';
import { HandTopZone } from './components/Zone/HandTopZone';
import { ZoneViewerTop } from './components/Zone/ZoneViewerTop';

import { GameZone } from './components/GameZone/GameZone';

import { SideboardBottomZone } from './components/Zone/SideboardBottomZone';
import { QuestsBottomZone } from './components/Zone/QuestsBottomZone';
import { GraveyardBottomZone } from './components/Zone/GraveyardBottomZone';
import { DeckBottomZone } from './components/Zone/DeckBottomZone';
import { HandBottomZone } from './components/Zone/HandBottomZone';
import { ZoneViewerBottom } from './components/Zone/ZoneViewerBottom';

export const GameTable = memo(() => {
  return (
    <Wrapper>
      <WrapperPanel size="sm">
        <SideboardTopZone />
        <QuestsTopZone />
        <GraveyardTopZone />
        <DeckTopZone />
        <HandTopZone />
        <ZoneViewerTop />
      </WrapperPanel>

      <WrapperPanel size="lg">
        <GameZone />
      </WrapperPanel>

      <WrapperPanel size="sm">
        <SideboardBottomZone />
        <QuestsBottomZone />
        <GraveyardBottomZone />
        <DeckBottomZone />
        <HandBottomZone />
        <ZoneViewerBottom />
      </WrapperPanel>
    </Wrapper>
  );
});
