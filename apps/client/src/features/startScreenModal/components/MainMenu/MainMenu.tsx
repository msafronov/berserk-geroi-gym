import { Text } from '@/ui/Text/Text';
import { Icon } from '@/ui/Icon/Icon';

import './styles.css';

export const MainMenu = () => {
  return (
    <div className="start-screen-modal-main-menu">
      <div className="start-screen-modal-main-menu-item">
        <Icon
          image="cogs"
          size="lg"
          onClick={() => {}}
        />
        <Text>настройки</Text>
      </div>
    </div>
  );
};
