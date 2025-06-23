import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import { openStartScreenModal } from '@/features/startScreenModal/actions';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { $settingsModalStore } from './store';
import { closeSettingsModal } from './actions';

import { Wrapper } from './components/Wrapper/Wrapper';
import { SettingsList } from './components/SettingsList/SettingsList';
import { DatabasePanel } from './components/DatabasePanel/DatabasePanel';
import { DatabaseNameSetting } from './components/Setting/DatabaseNameSetting';
import { AutoDealCardsSetting } from './components/Setting/AutoDealCardsSetting';
import { InitialCoinCountSetting } from './components/Setting/InitialCoinCountSetting';

export const SettingsModal = memo(() => {
  const { isOpened } = useStore($settingsModalStore);

  const onClose = useCallback(() => {
    closeSettingsModal();
    openStartScreenModal();
  }, []);

  if (!isOpened) {
    return null;
  }

  return (
    <Modal.Wrapper size="sm">
      <Modal.Header onClose={onClose}>
        <Text
          size="lg"
          weight="bold"
        >
          Настройки
        </Text>
      </Modal.Header>

      <Modal.Body>
        <Wrapper>
          <DatabasePanel />

          <SettingsList>
            <DatabaseNameSetting />
            <AutoDealCardsSetting />
            <InitialCoinCountSetting />
          </SettingsList>
        </Wrapper>
      </Modal.Body>

      <Modal.Footer>
        <Button color="white" onClick={onClose}>
          <Text color="black">
            Закрыть
          </Text>
        </Button>
      </Modal.Footer>
    </Modal.Wrapper>
  );
});
