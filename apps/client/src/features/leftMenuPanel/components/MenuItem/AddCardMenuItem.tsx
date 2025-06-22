import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';

import { addCard } from '../../actions';

import './styles.css';

export const AddCardMenuItem = () => {
  const onClick = useCallback(() => {
    addCard();
  }, []);

  return (
    <div className="left-menu-panel-item">
      <Button
        color="violett"
        onClick={onClick}
      >
        <Icon image="plus" />
      </Button>
    </div>
  );
};
