import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { $confirmationModalStore } from './store';
import { onDecline, onSuccess } from './actions';

import { Wrapper } from './components/Wrapper/Wrapper';

export const ConfirmationModal = memo(() => {
  const { isOpened, title, description } = useStore($confirmationModalStore);

  const onSuccessClick = useCallback(() => {
    onSuccess();
  }, []);

  const onDeclineClick = useCallback(() => {
    onDecline();
  }, []);

  if (!isOpened) {
    return null;  
  }

  return (
    <Modal.Wrapper size="sm2">
      <Modal.Header>
        <Text size="lg" weight="bold">
          {title}
        </Text>
      </Modal.Header>

      <Modal.Body>
        <Wrapper>
          <Text textAlign="center">
            {description}
          </Text>
        </Wrapper>
      </Modal.Body>

      <Modal.Footer>
        <Button color="white" onClick={onDeclineClick}>
          <Text color="black">
            Отмена
          </Text>
        </Button>

        <Button color="red" onClick={onSuccessClick}>
          <Text color="white">
            Подтвердить
          </Text>
        </Button>
      </Modal.Footer>
    </Modal.Wrapper>
  );
});
