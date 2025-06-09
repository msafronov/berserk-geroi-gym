import { useEffect, useState } from 'preact/hooks';
import { memo } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import { $gameTableStore } from '../../../../store';

import { ControlsPanel } from './components/ControlsPanel/ControlsPanel';

import './styles.css';
import { RedControls } from './components/Controls/RedControls';
import { GreenControls } from './components/Controls/GreenControls';
import { WhiteControls } from './components/Controls/WhiteControls';
import { BlackControls } from './components/Controls/BlackControls';

type Coordinates = {
  leftPanelX: number;
  leftPanelY: number;
  rightPanelX: number;
  rightPanelY: number;
}

const BORDER_OFFSET_PX = 4;
const LEFT_OFFSET_PX = 32;
const TOP_OFFSET_PX = 15;

export const ActiveCardSettingsPanel = memo(() => {
  const { isDragging, activeGameTableCard } = useStore($gameTableStore);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!activeGameTableCard) {
      setCoordinates(null);
      return;
    }

    if (activeGameTableCard.zone !== 'gameZone') {
      setCoordinates(null);
      return;
    }

    if (activeGameTableCard) {
      setCoordinates({
        leftPanelX: activeGameTableCard.x - LEFT_OFFSET_PX - BORDER_OFFSET_PX,
        leftPanelY: activeGameTableCard.y - TOP_OFFSET_PX + BORDER_OFFSET_PX,
        rightPanelX: activeGameTableCard.x + activeGameTableCard.width + (BORDER_OFFSET_PX * 3),
        rightPanelY: activeGameTableCard.y - TOP_OFFSET_PX + BORDER_OFFSET_PX,
      });
    } else {
      setCoordinates(null);
    }
  }, [activeGameTableCard, isDragging]);

  if (!coordinates) {
    return null;
  }

  return (
    <>
      <ControlsPanel
        x={coordinates.leftPanelX}
        y={coordinates.leftPanelY}
      >
        <RedControls />
        <GreenControls />
      </ControlsPanel>

      <ControlsPanel
        x={coordinates.rightPanelX}
        y={coordinates.rightPanelY}
      >
        <WhiteControls />
        <BlackControls />
      </ControlsPanel>
    </>
  );
});
