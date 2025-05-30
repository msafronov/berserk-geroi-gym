import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';

import { $decksModalStore } from './store';
import { closeDecksModal } from './actions';
import { openStartScreenModal } from '@/features/startScreenModal/actions';

export const DecksModal = memo(() => {
  const { isOpened } = useStore($decksModalStore);

  const onClose = useCallback(() => {
    closeDecksModal();
    openStartScreenModal();
  }, []);

  if (!isOpened) {
    return null;
  }

  return (
    <Modal.Wrapper size="md">
      <Modal.Header onClose={onClose}>
        <Text
          size="lg"
          weight="bold"
        >
          Колоды
        </Text>
      </Modal.Header>

      <Modal.Body>
        <Text>...</Text>
      </Modal.Body>
    </Modal.Wrapper>
  );
});
