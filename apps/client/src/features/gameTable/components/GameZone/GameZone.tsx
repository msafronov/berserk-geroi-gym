import { useEffect, useRef } from 'preact/hooks';
import { useStore } from '@nanostores/preact';

import { useDrag } from '../../hooks/useDrag';
import { $gameTableStore } from '../../store';
import { saveGameZoneRef } from '../../actions';

import { DraggableZoneCard } from '../DraggableZoneCard/DraggableZoneCard';

import { ActiveCardSettingsPanel } from './components/ActiveCardSettingsPanel/ActiveCardSettingsPanel';
import { CardWrapper } from './components/CardWrapper/CardWrapper';
import { ActiveCardControlls } from './components/ActiveCardControlls/ActiveCardControlls';
import { CardCounters } from './components/CardCounters/CardCounters';

import './styles.css';

export const GameZone = () => {
  const { gameZone } = useStore($gameTableStore);
  const { onDragStart, onDrop, onDragOver } = useDrag({ zoneType: 'gameZone' });

  const gameZoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gameZoneRef.current) {
      saveGameZoneRef(gameZoneRef.current);
    }
  }, []);

  return (
    <div
      className="game-table-game-zone"
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      ref={gameZoneRef}
    >
      <ActiveCardSettingsPanel />

      {gameZone.map((card, order) => {
        return (
          <DraggableZoneCard
            card={card}
            position="absolute"
            order={order}
          >
            <CardWrapper>
              <ActiveCardControlls card={card} />
              <CardCounters card={card} />
            </CardWrapper>
          </DraggableZoneCard>
        );
      })}
    </div>
  );
};
