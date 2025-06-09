import { memo, useCallback, useEffect } from 'preact/compat';
import { useStore } from '@nanostores/preact';

import * as Modal from '@/ui/Modal';
import { Text } from '@/ui/Text/Text';
import { Button } from '@/ui/Button/Button';

import { $cardPickerModalStore } from './store';
import { closeCardPickerModal, init } from './actions';
import { SetSelect } from './components/SetSelect/SetSelect';
import { CardList } from './components/CardList/CardList';
import { Pagination } from './components/Pagination/Pagination';

export const CardPickerModal = memo(() => {
  const { isOpened, title } = useStore($cardPickerModalStore);

  const onClose = useCallback(() => {
    closeCardPickerModal();
  }, []);

  useEffect(() => {
    if (isOpened) {
      init();
    }
  }, [isOpened]);

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
          {title}
        </Text>
      </Modal.Header>

      <Modal.Body>
        <SetSelect />
        <Pagination />
        <CardList />
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
