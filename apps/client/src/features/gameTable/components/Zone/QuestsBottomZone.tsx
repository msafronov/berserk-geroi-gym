import { useStore } from '@nanostores/preact';
import { useCallback } from 'preact/hooks';

import { $gameTableStore } from '../../store';
import { setActiveZoneBottom } from '../../actions';
import { useDrag } from '../../hooks/useDrag';

import { DraggableZoneCard } from '../DraggableZoneCard/DraggableZoneCard';

import { Wrapper } from './components/Wrapper/Wrapper';
import { Title } from './components/Title/Title';
import { ZoneContent } from './components/ZoneContent/ZoneContent';
import { Info } from './components/Info/Info';

export const QuestsBottomZone = () => {
  const { questsBottom, activeZoneBottom } = useStore($gameTableStore);

  const zoneType = 'questsBottom';
  const isActive = zoneType === activeZoneBottom;
  
  const { onDragStart, onDrop, onDragOver } = useDrag({ zoneType });
  
  const onClick = useCallback(() => {
    setActiveZoneBottom(zoneType);
  }, []);

  const topCard = questsBottom[0];

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
        cards={questsBottom}
      />
    </Wrapper>
  );
};
