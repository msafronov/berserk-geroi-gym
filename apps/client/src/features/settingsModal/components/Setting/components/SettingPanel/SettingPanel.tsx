import clsx from 'clsx';
import type { JSX } from 'preact/jsx-runtime';

import './styles.css';

type Props = {
  direction: 'left' | 'right';
  children: JSX.Element | (JSX.Element | boolean)[];
};

export const SettingPanel = ({ direction, children }: Props) => {
  return (
    <div
      className={clsx('settings-modal-setting-panel', {
        [`settings-modal-setting-panel--direction--${direction}`]: direction,
      })}
    >
      {children}
    </div>
  );
};
