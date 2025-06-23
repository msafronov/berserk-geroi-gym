import { useCallback } from 'preact/hooks';

import { openSettingsModal } from '@/features/settingsModal/actions';

import { Text } from '@/ui/Text/Text';
import { Icon } from '@/ui/Icon/Icon';

import { closeStartScreenModal } from '../../actions';

import './styles.css';

export const MainMenu = () => {
  const onSettingsClick = useCallback(() => {
    closeStartScreenModal();
    openSettingsModal();
  }, []);

  return (
    <div className="start-screen-modal-main-menu">
      <div className="start-screen-modal-main-menu-item">
        <Icon
          image="cogs"
          size="lg"
          onClick={onSettingsClick}
        />
        <Text>настройки</Text>
      </div>
    </div>
  );
};
