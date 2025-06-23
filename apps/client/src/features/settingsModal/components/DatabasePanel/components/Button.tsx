import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const DatabasePanelButton = ({ children }: Props) => {
  return (
    <div className="settings-modal-database-panel-button">
      {children}
    </div>
  );
};
