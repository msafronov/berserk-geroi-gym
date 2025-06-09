import type { JSX } from 'preact/jsx-runtime';
import { useCallback } from 'preact/hooks';

import { setActiveGameTableCardId } from '../../actions';

import './styles.css';

type Props = {
  children: JSX.Element[];
}

export const Wrapper = ({ children }: Props) => {
  const onGameTableClick = useCallback((event: MouseEvent) => {
    for (let node of event.composedPath()) {
      // @ts-ignore
      const { objectId, objectValue } = node?.dataset || {};

      if (objectId === 'card') {
        setActiveGameTableCardId(objectValue);
        return;
      }

      if (objectId === 'cardSettingsPanel') {
        // не перехватываем клик по панели с настройками активной карты
        return;
      }
    }

    setActiveGameTableCardId(null);
  }, []);

  return (
    <div
      className="game-table-wrapper"
      onClick={onGameTableClick}
    >
      {children}
    </div>
  );
};
