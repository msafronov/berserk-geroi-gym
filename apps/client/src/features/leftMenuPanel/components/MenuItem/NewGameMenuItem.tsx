import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';

import { startNewGame } from '../../actions';

import './styles.css';

export const NewGameMenuItem = () => {
  const onClick = useCallback(() => {
    startNewGame();
  }, []);

  return (
    <div className="left-menu-panel-item">
      <Button
        color="violett"
        onClick={onClick}
      >
        <Icon image="start-new-game" />
      </Button>
    </div>
  );
};
