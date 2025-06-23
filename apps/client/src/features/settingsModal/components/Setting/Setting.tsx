import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const Setting = ({ children }: Props) => {
  return (
    <div className="settings-modal-setting">
      {children}
    </div>
  );
};
