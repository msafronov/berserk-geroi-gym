import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  x: number;
  y: number;
  children: JSX.Element | JSX.Element[];
};

export const ControlsPanel = ({ x, y, children }: Props) => {
  return (
    <div
      data-object-id="cardSettingsPanel"
      className="game-table-card-settings-controls-panel"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {children}
    </div>
  );
};
