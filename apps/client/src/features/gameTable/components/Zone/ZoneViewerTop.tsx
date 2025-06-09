import { useMemo } from 'preact/hooks';
import { useStore } from '@nanostores/preact';

import { $gameTableStore } from '../../store';
import { useDrag } from '../../hooks/useDrag';

import { Wrapper } from './components/Wrapper/Wrapper';
import { Title } from './components/Title/Title';
import { ZoneContent } from './components/ZoneContent/ZoneContent';
import { ActiveCardMenu } from './components/ActiveCardMenu/ActiveCardMenu';
import { DraggableZoneCard } from '../DraggableZoneCard/DraggableZoneCard';
import { DeckHelpInfo } from './components/DeckHelpInfo/DeckHelpInfo';

export const ZoneViewerTop = () => {
  const {
    activeZoneTop,
    handTop,
    deckTop,
    graveyardTop,
    questsTop,
    sideboardTop,
  } = useStore($gameTableStore);
  
  const { onDragStart, onDrop, onDragOver } = useDrag({ zoneType: activeZoneTop });
  
  const cards = useMemo(() => {
    if (activeZoneTop === 'handTop') {
      return handTop;
    }

    if (activeZoneTop === 'deckTop') {
      return deckTop;
    }

    if (activeZoneTop === 'graveyardTop') {
      return graveyardTop;
    }

    if (activeZoneTop === 'questsTop') {
      return questsTop;
    }

    if (activeZoneTop === 'sideboardTop') {
      return sideboardTop;
    }

    return [];
  }, [
    activeZoneTop,
    handTop,
    deckTop,
    graveyardTop,
    questsTop,
    sideboardTop,
  ]);

  return (
    <Wrapper
      size="lg"
      borderRight="sm"
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Title
        zoneType={activeZoneTop}
        isActive={true}
      >
        {
          activeZoneTop === 'deckTop'
            ? (
              <DeckHelpInfo />
            )
            : undefined
        }
      </Title>

      <ZoneContent
        zoneType={null}
        orientation="horizontal"
        isActive={true}
      >
        {cards.map((card, order) => {
          return (
            <DraggableZoneCard
              card={card}
              order={order}
            >
              {
                card.isActive
                  ? (
                    <ActiveCardMenu 
                      card={card}
                    />
                  )
                  : null
              }
            </DraggableZoneCard>
          );
        })}
      </ZoneContent>
    </Wrapper>
  );
};
