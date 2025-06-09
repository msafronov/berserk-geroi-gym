import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import { $gameTableStore } from '../../store';
import { setActiveZoneTop } from '../../actions';
import { useDrag } from '../../hooks/useDrag';

import { DraggableZoneCard } from '../DraggableZoneCard/DraggableZoneCard';

import { Wrapper } from './components/Wrapper/Wrapper';
import { Title } from './components/Title/Title';
import { ZoneContent } from './components/ZoneContent/ZoneContent';
import { Info } from './components/Info/Info';
import { ZoneMenuControl } from './components/ZoneMenuControl/ZoneMenuControl';

export const GraveyardTopZone = () => {
  const { graveyardTop, activeZoneTop } = useStore($gameTableStore);

  const zoneType = 'graveyardTop';
  const isActive = zoneType === activeZoneTop;
  
  const { onDragStart, onDrop, onDragOver } = useDrag({ zoneType });

  const onClick = useCallback(() => {
    setActiveZoneTop(zoneType);
  }, []);

  const topCard = graveyardTop[0];

  return (
    <Wrapper
      isActive={isActive}
      onClick={onClick}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Title
        zoneType={zoneType}
        isActive={isActive}
      />

      <ZoneMenuControl
        zoneType={zoneType}
      />
      
      <ZoneContent
        zoneType={zoneType}
        isActive={isActive}
      >
        {topCard
          ? (
            <DraggableZoneCard
              card={topCard}
              order={0}
            />
          )
          : null
        }
      </ZoneContent>
      
      <Info
        cards={graveyardTop}
      />
    </Wrapper>
  );
};
