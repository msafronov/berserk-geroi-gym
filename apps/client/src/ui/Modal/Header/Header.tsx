import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  onClose?: () => void;
  children: JSX.Element | JSX.Element[];
};

export const Header = ({ onClose, children }: Props) => {
  return (
    <div className="modal-header">
      {onClose && (
        <span
          onClick={onClose}
          class="modal-header-close"
        >&times;</span>
      )}

      {children}
    </div>
  );
};
