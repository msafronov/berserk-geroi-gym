import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element[];
};

export const TopPanel = ({ children }: Props) => {
  return (
    <div className="deck-editor-top-panel">
      {children}
    </div>
  )
};
