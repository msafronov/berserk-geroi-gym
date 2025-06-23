import { memo, useCallback } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { $messageModalStore } from './store';
import { onSuccess } from './actions';

import { Wrapper } from './components/Wrapper/Wrapper';

export const MessageModal = memo(() => {
  const { isOpened, title, description } = useStore($messageModalStore);

  const onSuccessClick = useCallback(() => {
    onSuccess();
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

      <Modal.Footer justifyContent="center">
        <Button color="white" onClick={onSuccessClick}>
          <Text color="black">
            OK
          </Text>
        </Button>
      </Modal.Footer>
    </Modal.Wrapper>
  );
});
