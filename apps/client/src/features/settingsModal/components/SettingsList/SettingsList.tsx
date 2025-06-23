import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const SettingsList = ({ children }: Props) => {
  return (
    <div className="settings-modal-settings-list">
      {children}
    </div>
  );
};
