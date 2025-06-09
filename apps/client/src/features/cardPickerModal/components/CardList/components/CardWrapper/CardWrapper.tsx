import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element;
  onClick: (event: MouseEvent) => void;
};

export const CardWrapper = ({ children, onClick }: Props) => {
  return (
    <div
      className="card-picker-card-wrapper"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
