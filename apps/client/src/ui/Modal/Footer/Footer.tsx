import clsx from 'clsx';
import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  justifyContent?: 'center';
  children: JSX.Element | JSX.Element[];
};

export const Footer = ({ justifyContent, children }: Props) => {
  return (
    <div className={clsx('modal-footer', {
      [`modal-footer--justifyContent--${justifyContent}`]: justifyContent,
    })}>
      {children}
    </div>
  );
};
