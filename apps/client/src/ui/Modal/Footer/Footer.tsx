import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const Footer = ({ children }: Props) => {
  return (
    <div className="modal-footer">
      {children}
    </div>
  );
};
