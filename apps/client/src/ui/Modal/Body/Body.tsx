import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  children: (JSX.Element | boolean) | (JSX.Element | boolean)[];
};

export const Body = ({ children }: Props) => {
  return (
    <div className="modal-body">
      {children}
    </div>
  );
};
