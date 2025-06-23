import { Text } from '@/ui/Text/Text';
import { Icon } from '@/ui/Icon/Icon';

import './styles.css';

export const SocialMedia = () => {
  return (
    <div className="start-screen-modal-social-media">
      <a href="https://berserkdeck.ru/" target="_blank">
        <div className="start-screen-modal-social-media-item">
          <Icon image="berserkdeck" />
          <Text size="sm">berserkdeck</Text>
        </div>
      </a>

      <a href="https://t.me/mfsafronov" target="_blank">
        <div className="start-screen-modal-social-media-item">
          <Icon image="telegram" />
          <Text size="sm">telegram</Text>
        </div>
      </a>

      <a href="https://github.com/msafronov/berserk-geroi-gym" target="_blank">
        <div className="start-screen-modal-social-media-item">
          <Icon image="github" />
          <Text size="sm">github</Text>
        </div>
      </a>
    </div>
  );
};
