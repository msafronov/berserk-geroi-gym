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

export const ZoneViewerBottom = () => {
  const {
    activeZoneBottom,
    handBottom,
    deckBottom,
    graveyardBottom,
    questsBottom,
    sideboardBottom,
  } = useStore($gameTableStore);
  
  const { onDragStart, onDrop, onDragOver } = useDrag({ zoneType: activeZoneBottom });

  const cards = useMemo(() => {
    if (activeZoneBottom === 'handBottom') {
      return handBottom;
    }

    if (activeZoneBottom === 'deckBottom') {
      return deckBottom;
    }

    if (activeZoneBottom === 'graveyardBottom') {
      return graveyardBottom;
    }

    if (activeZoneBottom === 'questsBottom') {
      return questsBottom;
    }

    if (activeZoneBottom === 'sideboardBottom') {
      return sideboardBottom;
    }

    return [];
  }, [
    activeZoneBottom,
    handBottom,
    deckBottom,
    graveyardBottom,
    questsBottom,
    sideboardBottom,
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
        zoneType={activeZoneBottom}
        isActive={true}
      >
        {
          activeZoneBottom === 'deckBottom'
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
