import { useCallback } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';

import { home } from '../../actions';

import './styles.css';

export const HomeMenuItem = () => {
  const onClick = useCallback(() => {
    home();
  }, []);

  return (
    <div className="left-menu-panel-item">
      <Button
        color="violett"
        onClick={onClick}
      >
        <Icon image="home" />
      </Button>
    </div>
  );
};
